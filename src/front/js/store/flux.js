const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: localStorage.getItem("token") || null,
            user_id: localStorage.getItem("user_id") || "",
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/hello"
                    );
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            createUser: (formData) => {
                return fetch("http://127.0.0.1:3001/api/sign_up", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("Success:", result);
                        return true;
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        return false;
                    });
            },

            logIn: async (email, password) => {
                const datos = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const response = await fetch(
                        "http://127.0.0.1:3001/api/login",
                        datos
                    );

                    if (response.status !== 200) {
                        console.error("Error:", error);
                        return false;
                    }
                    let data = await response.json();

                    localStorage.setItem("token", data.token);
                    setStore({ token: data.token });
                    setStore({ user_id: data.user_id });
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            logout: () => {
                localStorage.removeItem("token");
                setStore({ token: null });
            },
        },
    };
};

export default getState;
