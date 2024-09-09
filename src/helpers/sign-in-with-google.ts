export const handleSignInWithGoogle = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4000/api/v1/auth/google",
  //       { withCredentials: true }
  //     );
  //     console.log(response);
  //     // Handle the redirection manually if necessary
  //   } catch (error) {
  //     console.error("Google Sign-In error:", error);
  //   }

  // RECOMMENDED WAY
  window.location.href =
    "https://alwan-api-server.vercel.app/api/v1/auth/google";
};
