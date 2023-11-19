import { HttpStatus, HttpException } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }
  public static createSignatureError(message: string){
    const typeError = message.split(" :: ")[0]
    const descriptionMsg = message.split(" :: ")[1]
    if(typeError){
        throw new HttpException(descriptionMsg, HttpStatus[typeError])
    }
    else{
        throw new HttpException(descriptionMsg, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
