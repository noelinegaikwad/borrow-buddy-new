/*
  BorrowBuddy shared item data module.
  Combines the 6 original seed items with any items users list via
  list-item.html. Everything lives in localStorage under bb_items.
  Include after auth.js:
    [script tag for auth.js]
    [script tag for items-data.js]
*/

const BB_ITEMS_KEY = "bb_items";

const BB_SEED_ITEMS = [
    {
        id: "1",
        name: "Camera Tripod",
        category: "Photography",
        photo: "📷",
        rating: "⭐ 4.8 · 12 reviews",
        location: "📍 Available nearby",
        description: "A sturdy camera tripod suitable for photography, video recording, events and personal projects. Available to borrow for short-term use.",
        condition: "Very Good",
        price: "Free",
        priceType: "free",
        owner: "Arjun",
        ownerId: "seed_arjun",
        ownerRating: "Item owner · ⭐ 4.9 rating",
        availability: true
    },
    {
        id: "2",
        name: "Scientific Calculator",
        category: "Study",
        photo: "🧮",
        rating: "⭐ 4.6 · 8 reviews",
        location: "📍 Available nearby",
        description: "A scientific calculator useful for mathematics, statistics, engineering and college examinations.",
        condition: "Good",
        price: "Free",
        priceType: "free",
        owner: "Priya",
        ownerId: "seed_priya",
        ownerRating: "Item owner · ⭐ 4.7 rating",
        availability: true
    },
    {
        id: "3",
        name: "Travel Suitcase",
        category: "Travel",
        photo: "🧳",
        rating: "⭐ 4.9 · 15 reviews",
        location: "📍 Available nearby",
        description: "A spacious travel suitcase suitable for short trips, vacations and weekend travel.",
        condition: "Very Good",
        price: "₹100/day",
        priceType: "paid",
        owner: "Rohan",
        ownerId: "seed_rohan",
        ownerRating: "Item owner · ⭐ 4.9 rating",
        availability: true
    },
    {
        id: "4",
        name: "Java Programming Book",
        category: "Books",
        photo: "📚",
        rating: "⭐ 4.7 · 10 reviews",
        location: "📍 Available nearby",
        description: "A useful Java programming book for students learning object-oriented programming and Java fundamentals.",
        condition: "Good",
        price: "Free",
        priceType: "free",
        owner: "Neha",
        ownerId: "seed_neha",
        ownerRating: "Item owner · ⭐ 4.8 rating",
        availability: true
    },
    {
        id: "5",
        name: "Electric Drill",
        category: "Tools",
        photo: "🔧",
        rating: "⭐ 4.5 · 6 reviews",
        location: "📍 Available nearby",
        description: "An electric drill suitable for basic household repairs, furniture work and small DIY projects.",
        condition: "Good",
        price: "₹50/day",
        priceType: "paid",
        owner: "Amit",
        ownerId: "seed_amit",
        ownerRating: "Item owner · ⭐ 4.6 rating",
        availability: true
    },
    {
        id: "6",
        name: "Football",
        category: "Sports",
        photo: "⚽",
        rating: "⭐ 4.8 · 9 reviews",
        location: "📍 Available nearby",
        description: "A football suitable for casual games, practice sessions and outdoor activities.",
        condition: "Very Good",
        price: "Free",
        priceType: "free",
        owner: "Rahul",
        ownerId: "seed_rahul",
        ownerRating: "Item owner · ⭐ 4.8 rating",
        availability: true
    }
];

function bbGetItems() {
    const raw = localStorage.getItem(BB_ITEMS_KEY);
    if (!raw) {
        localStorage.setItem(BB_ITEMS_KEY, JSON.stringify(BB_SEED_ITEMS));
        return BB_SEED_ITEMS.slice();
    }
    return JSON.parse(raw);
}

function bbSaveItems(items) {
    localStorage.setItem(BB_ITEMS_KEY, JSON.stringify(items));
}

function bbGetItemById(id) {
    const items = bbGetItems();
    return items.find(i => String(i.id) === String(id)) || items[0];
}

function bbGetItemsByOwner(ownerId) {
    return bbGetItems().filter(i => i.ownerId === ownerId);
}

// Creates a new listing from the "List an Item" form.
function bbCreateItem(data, user) {
    const items = bbGetItems();

    const newItem = {
        id: "item_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        name: data.name,
        category: data.category,
        photo: data.photo || "📦",
        rating: "⭐ New listing",
        location: data.location ? "📍 " + data.location : "📍 Location not specified",
        description: data.description,
        condition: data.condition,
        price: data.priceType === "free" ? "Free" : ("₹" + data.priceAmount + "/day"),
        priceType: data.priceType,
        owner: user.name,
        ownerId: user.id,
        ownerRating: "Item owner · New member",
        availability: true
    };

    items.push(newItem);
    bbSaveItems(items);
    return newItem;
}

function bbSetItemAvailability(itemId, available) {
    const items = bbGetItems();
    const item = items.find(i => String(i.id) === String(itemId));
    if (item) {
        item.availability = available;
        bbSaveItems(items);
    }
}

function bbDeleteItem(itemId) {
    const items = bbGetItems().filter(i => String(i.id) !== String(itemId));
    bbSaveItems(items);
}
