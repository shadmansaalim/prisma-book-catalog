// Imports
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

// Function to sign up an user (CREATE AN ACCOUNT)
const signUpUser = async (userData: User): Promise<User> => {
  // Finding if the user already exists in our system
  const existingUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  // Throwing an error if user exists
  if (existingUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'An user already exists in our system with provided email.'
    );
  }

  // Hashing the user password before inserting to DB
  const hashedPassword = await bcrypt.hash(
    userData?.password,
    Number(config.bcrypt_salt_rounds)
  );

  // Setting user's password as hashed pasword
  userData.password = hashedPassword;

  return await prisma.user.create({
    data: userData,
  });
};

// Function to sign in an user (LOGIN)
const signInUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  // Finding whether user is in our system or not
  const userExists = await prisma.user.findFirst({
    where: {
      email: payload?.email,
    },
  });

  // Throwing error if user does not exists
  if (!userExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is no account in our system with requested email.'
    );
  }

  // Comparing Password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    userExists?.password
  );

  // Throwing error if password does not matches
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password.');
  }

  // Creating token for the user
  const token = JwtHelpers.createToken(
    { id: userExists?.id, role: userExists?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { token };
};

export const AuthService = {
  signUpUser,
  signInUser,
};
