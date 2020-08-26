export const API_URL =
process.env.NODE_ENV === "development" ? "http://localhost:80/api" : "/api";

export function logout() {
    let url = API_URL + `/users/logout`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(() => {
        alert("You have been logged out.");
        window.location.href = "/";
      })
      .catch(() => alert("You couldn't be logged out, please try again."));
  }

  export function isLoggedIn() {
    let url = API_URL + `/users/isLoggedIn`;
    return fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
  }

  export function loginAsGuest() {
    let url = API_URL + `/users/guest`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function getUser() {
    let url = API_URL + `/users/user`;
    return fetch(url, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function deleteNote(noteId) {
    let url = API_URL + `/notes/${noteId}`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function setNote(noteId, note) {
    let url = API_URL + `/notes/${noteId}`;
    let body = JSON.stringify({ note });

    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function getNote(noteId) {
    let url = API_URL + `/notes/${noteId}`;
    return fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function createNewNote() {
    let url = API_URL + `/notes/create`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function getNoteTree() {
    let url = API_URL + `/users/notesTree`;

    return fetch(url, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  export function setNoteTree(tree) {
    let url = API_URL + `/users/notesTree`;
    let body = JSON.stringify({ notesTree: tree });

    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }