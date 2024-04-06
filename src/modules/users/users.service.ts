import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Prisma } from "@prisma/client";

import { db } from "../../utils/db.util";
import { logger } from "../../utils/logger.util";
import { BadRequestException } from "../../utils/exception.util";
import { date } from "zod";
import {hashPassword}  from '../../utils/hash.util'
import { checkunixtimeUnderMinutes, dateToUnixTime } from "../../utils/unixtime.utils";
import cron from 'cron';

export async function findManyUser(args?: {
  select?: Prisma.UserSelect<DefaultArgs>;
  where?: Prisma.UserWhereInput;
}) {
  return db.user.findMany(args);
}

export async function findOneUser(args?: {
  select?: Prisma.UserSelect<DefaultArgs>;
  where?: Prisma.UserWhereInput;
}) {
  return db.user.findFirst(args);
}

export async function findUserById(id: number | undefined) {
  return db.user.findUnique({ where: { id } });
}

export async function createUser(user: Prisma.UserCreateInput) {
  try {
    user.password =  await  hashPassword(user.password)
    return await db.user.create({ data: user });
  } catch (err) {
    logger.error(err.message);
    throw new BadRequestException(err.message);
  }
}

export async function updateUser(id: number, user: Prisma.UserUpdateInput) {
  try {
    return await db.user.update({
      data: user,
      where: { id },
    });
  } catch (err) {
    logger.error(err.message);
    throw new BadRequestException(err.message);
  }

  
}
export async function protectedroute() {
    return  "token is valid"
} 

export async function upsertIp(ipAddress:any,userId:number){
  const user  =  await  db.ipAddress.findFirst({
    where:{
      ipAddress:ipAddress,
      userId:userId,
    }
  })
  // if(user?.isblocked)  throw new BadRequestException('your Ip has been Blocked');
  
  // if(user?.createdAt <)
  // console.log(user)
  if(!user){
    return  await createIpAddress(ipAddress,userId)
  }
  const firstAttempt = dateToUnixTime(user.createdAt)
  // const current
  // checkunixtimeUnderMinutes
  const checkAttempTime = checkunixtimeUnderMinutes(firstAttempt,5)
  if(checkAttempTime){
    if(user.attempt >= 5){
      return await  updateIpAddress(user.id,user.attempt+1,true)
    }
    else{
      return await updateIpAddress(user.id,user.attempt+1,false)
    }
  }
  else{
    await deleteIpAddress(user?.id)
    return  await createIpAddress(ipAddress,userId)
  }
  
}

export async function createIpAddress(ipAddress:string,userId:number) {
  try{
    return await  db.ipAddress.create({data:{userId:userId,ipAddress:ipAddress}})
  }catch(err){
    this.logger.error(err.message);
    throw err;
  }
}

export async function updateIpAddress(ipAddressId:number,attempt:number,isBlocked:boolean) {
  try{
    return  await db.ipAddress.update({
      data:{attempt:attempt,isblocked:isBlocked},
      where:{id:ipAddressId}
    })
    // return await  db.ipAddress.create({data:{userId:userId,ipAddress:ipAddress}})
  }catch(err){
    this.logger.error(err.message);
    throw err;
  }
}

export async function deleteIpAddress(id:number) {
  try{
    return  await db.ipAddress.delete({where:{id:id}})
    // return await  db.ipAddress.create({data:{userId:userId,ipAddress:ipAddress}})
  }catch(err){
    this.logger.error(err.message);
    throw err;
  }
}

export async function deleteManyIpAddress() {
  try{
    return  await db.ipAddress.deleteMany({where:{isblocked:true}})
    // return await  db.ipAddress.create({data:{userId:userId,ipAddress:ipAddress}})
  }catch(err){
    this.logger.error(err.message);
    throw err;
  }
}


