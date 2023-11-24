// common js functions
document.addEventListener("DOMContentLoaded", async function () {
  const path = window.location.pathname;
  try {
    response = await fetch("/login/verify", {
      method: "HEAD",
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
  } catch (e) {
    console.error(e.message);
  }

  if (!response.ok && path !== "/login") {
    window.location.href = "/login";
  } else if (response.ok && path == "/login") {
    window.location.href = "/";
  }
});

async function executeLogin(formData) {
  let response;
  try {
    response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (e) {
    console.error(e.message);
    return { login: false, message: "server is not responding" };
  }

  if (response.ok) {
    const successObject = await response.json();
    return { login: true, ...successObject };
  } else {
    return { login: false, message: "wrong credentials" };
  }
}

function serializeFormData(form) {
  var formData = new FormData(form);
  var serializedData = {};

  for (var [name, value] of formData) {
    if (serializedData[name]) {
      if (!Array.isArray(serializedData[name])) {
        serializedData[name] = [serializedData[name]];
      }
      serializedData[name].push(value);
    } else {
      serializedData[name] = value;
    }
  }

  return serializedData;
}
