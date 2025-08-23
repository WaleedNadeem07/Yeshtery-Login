"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);


  const isEmailValid = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isEmailValid(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: undefined });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous errors

    if (!validate()) return;

    setLoading(true);
    try {
        const response = await fetch("https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isEmployee: true }),
        });

        if (!response.ok) {
        throw new Error("Invalid email or password");
        }

        const data = await response.json();
        console.log("Login successful. Token:", data.token);
        // ✅ Next step: Save token in secure cookie and redirect
    } catch (error: any) {
        setApiError(error.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
    };

  // Button disabled only if fields are empty or email invalid
  const isButtonDisabled = !email || !password || !isEmailValid(email);

  return (
    <div className="relative min-h-screen bg-[#E9ECF2] overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute w-[807px] h-[807px] left-10 -top-96 bg-[#9E77F6]/60 blur-[400px]" />
      <div className="absolute w-[813px] h-[813px] -left-28 bottom-0 bg-[#B0D2E5]/60 blur-[400px]" />
      <div className="absolute w-[667px] h-[667px] right-10 bottom-0 bg-[#9E97F6] blur-[200px]" />
      <div className="absolute w-[667px] h-[667px] right-1/3 -top-64 bg-[#E477F6] blur-[200px]" />

      {/* Full-Screen Glass Container */}
      <div className="relative flex min-h-screen bg-white/60 border-2 border-white rounded-[20px] backdrop-blur-md overflow-hidden">
        {/* Left Section (Form) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-12">
          <div className="w-full max-w-sm mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-semibold text-[#1A1A1E] mb-4">
              Welcome back
            </h1>

            {/* Subtitle */}
            <p className="text-[#62626B] text-base md:text-lg leading-relaxed mb-8">
              Step into our shopping metaverse for an unforgettable shopping
              experience
            </p>

            {/* Form Wrapper */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              {/* Email Input */}
              <div className="flex flex-col w-full mb-4">
                <div className="flex items-center gap-3 bg-white/40 border border-white rounded-md px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                    className="w-full text-base bg-transparent focus:outline-none text-[#62626B] placeholder-[#62626B]"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col w-full mb-6">
                <div className="flex items-center gap-3 bg-white/40 border border-white rounded-md px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                    className="w-full text-base bg-transparent focus:outline-none text-[#62626B] placeholder-[#62626B]"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                    type="submit"
                    disabled={isButtonDisabled || loading}
                    className="w-full py-3.5 bg-[#9414FF] text-white rounded-md text-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Login"}
              </button>
                          
              {apiError && <p className="text-red-500 text-sm mt-3">{apiError}</p>}

              {/* Sign Up */}
              <p className="mt-4 text-sm md:text-base text-[#62626B] text-center w-full">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-[#9414FF] hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 relative">
          {/* Spiral Wrapper */}
          <div
            className="absolute"
            style={{
              width: "696.32px",
              height: "288.17px",
              left: "calc(50% - 696.32px/2 - 17.84px)",
              top: "calc(50% - 288.17px/2 - 118.42px)",
              transform: "rotate(-21.61deg)",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/spiral-solid.png"
                alt="Spiral Solid"
                fill
                className="absolute inset-0 object-contain"
              />
              <Image
                src="/spiral-coil.png"
                alt="Spiral Coil"
                fill
                className="absolute inset-0 object-contain scale-570 pointer-events-none"
              />
            </div>
          </div>

          {/* Meetus AR Logo */}
          <div
            className="absolute"
            style={{
              width: "413px",
              height: "75px",
              left: "calc(50% - 413px/2 - 36.5px)",
              top: "511px",
            }}
          >
            <Image
              src="/meetusvr-logo.png"
              alt="Meetus AR"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
