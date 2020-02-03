/*
 * @Author: your name
 * @Date: 2020-01-24 16:36:44
 * @LastEditTime : 2020-01-29 21:20:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.interface.ts
 */
export interface UserData {
    name: string,
    mobile_number: number,
    mailbox?: string,
    portrait?: string,
    token?: string
}

export interface UserRO {
    user: UserData;
}