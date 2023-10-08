// Imports
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

// GET Profile Function
const getProfile = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const ProfileService = {
  getProfile,
};
