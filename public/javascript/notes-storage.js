const NoteStorage = (() => {
    // Define a function to generate the key for each note based on the date
    const generateKey = (year, month, day) => {
        return `${year}-${month + 1}-${day}`;
    };

    // Function to get the note for a given day
    const getNote = (year, month, day) => {
        const key = generateKey(year, month, day);
        return localStorage.getItem(key);
    };

    // Function to save a note for a given day
    const saveNote = (year, month, day, noteContent) => {
        const key = generateKey(year, month, day);
        if (noteContent) {
            localStorage.setItem(key, noteContent);
        } else {
            localStorage.removeItem(key);
        }
    };

    // Function to delete the note for a given day
    const deleteNote = (year, month, day) => {
        const key = generateKey(year, month, day);
        localStorage.removeItem(key);
    };

    // Expose the functions for usage
    return {
        getNote,
        saveNote,
        deleteNote
    };
})();