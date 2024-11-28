import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashPassword = async (userValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userValue, salt);

  return hashedPassword;
};

export const comparePassword = async (userPassword, password) => {
  try {
    console.log("Plaintext Password:", userPassword);
    console.log("Hashed Password:", password);
//Plaintext Password: 1
//Hashed Password: $2b$10$nuXshYSARdBWCTHlfsl9euv4TMHmexXY0slXmx6YY1xlEMzO7alCy
    const isMatch = await bcrypt.compare(userPassword, password);

    return isMatch; // true if passwords match, false otherwise
  } catch (error) {
      console.error("Error comparing passwords:", error);
        throw error; // Handle error appropriately
  }
};

export const createJWT = (id) => {
  return JWT.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export function getMonthName(index) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[index];
}
