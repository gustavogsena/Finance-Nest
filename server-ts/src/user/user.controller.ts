import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async user(@Req() request: Request) {
        const payload = request['user'];
        const user = await this.userService.findById(payload.id);
        return user;
    }

    @Post('upload-picture')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() picture: Express.Multer.File,
        @Req() req: Request,
    ) {
        const userId = req['user'].id;
        return await this.userService.uploadPicture(userId, picture.buffer);
    }
}
