export const routes = {
    home: {
        path: '/',
        isAuthenticated: true
    },
    group: {
        path: "/group",
        isAuthenticated: true
    },
    createGroup: {
        path: "/create-group",
        isAuthenticated: true
    },
    viewGroup: {
        path: "/view-group/:id",
        isAuthenticated: true,
    },
    editGroup: {
        path: "/edit-group/:id",
        isAuthenticated: true,
    },
    deleteGroup: {
        path: "/delete-group/:id",
        isAuthenticated: true,
    },
    reminders: {
        path: '/reminders',
        isAuthenticated: true
    },
    createReminder: {
        path: '/create-reminder',
        isAuthenticated: true
    },
    "create-tag": {
        path: "/create-tag",
        isAuthenticated: true
    },
    "edit-tag": {
        path: "/edit-tag",
        isAuthenticated: true
    },
    "view-tag-details": {
        path: "/view-tag-details",
        isAuthenticated: true
    },
    "view-tags": {
        path: "/view-tags",
        isAuthenticated: true
    }
}

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
};