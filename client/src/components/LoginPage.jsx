import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const clearForm = () => {
        setFormData({ email: "", password: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(d=errorData.error || "Login failed");
            }

            const data = await res.json();

            // Save JWT
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success(`Welcome, ${data.user.username || data.user.email}!`);

            // Show user name
            setUser(data.user);

            clearForm();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }
    
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="email" 
            required 
        />
        <input 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="password" 
            required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginPage
