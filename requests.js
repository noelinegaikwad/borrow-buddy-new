/*
  BorrowBuddy shared borrow-request module.
  Handles the full lifecycle: pending -> accepted/rejected -> returned.
  Include after auth.js and items-data.js:
    [script tag for auth.js]
    [script tag for items-data.js]
    [script tag for requests.js]
*/

const BB_REQUESTS_KEY = "bb_requests";

function bbGetRequests() {
    const raw = localStorage.getItem(BB_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function bbSaveRequests(requests) {
    localStorage.setItem(BB_REQUESTS_KEY, JSON.stringify(requests));
}

function bbGetRequestsForItem(itemId) {
    return bbGetRequests().filter(r => String(r.itemId) === String(itemId));
}

// Requests where the current user is the borrower.
function bbGetMyRequests(userId) {
    return bbGetRequests().filter(r => r.borrowerId === userId);
}

// Requests made BY OTHERS on items the current user owns.
function bbGetIncomingRequests(userId) {
    const myItemIds = bbGetItemsByOwner(userId).map(i => String(i.id));
    return bbGetRequests().filter(r => myItemIds.includes(String(r.itemId)));
}

function bbCreateRequest(itemId, borrowerId) {
    const requests = bbGetRequests();

    const newRequest = {
        id: "req_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        itemId: itemId,
        borrowerId: borrowerId,
        status: "pending", // pending -> accepted -> returned, or rejected
        createdAt: new Date().toISOString()
    };

    requests.push(newRequest);
    bbSaveRequests(requests);
    return newRequest;
}

function bbUpdateRequestStatus(requestId, status) {
    const requests = bbGetRequests();
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    req.status = status;
    bbSaveRequests(requests);

    // Keep item availability in sync with the request lifecycle.
    if (status === "accepted") {
        bbSetItemAvailability(req.itemId, false);
    } else if (status === "returned" || status === "rejected") {
        bbSetItemAvailability(req.itemId, true);
    }
}
