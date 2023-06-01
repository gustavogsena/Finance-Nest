import { Controller, Delete, Get, Param, Post, Req, Sse } from "@nestjs/common";
import { RadarService } from "./radar.service";
import { Subject, interval, map } from "rxjs";
import { EventEmitter2 } from '@nestjs/event-emitter';


@Controller('/radar')
export class RadarController {
    constructor(
        private readonly radarService: RadarService,
        private eventEmitter: EventEmitter2,) { }

    @Get()
    async getRadarItens(@Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.radarService.findAll(userId);
        return response
    }

    @Post('/:code')
    async createRadarItem(@Req() req: Request, @Param('code') code: string) {
        const userId: number = req['user'].id
        const response = await this.radarService.create(code, userId)
        return response
    }

    @Delete('/:radarId')
    async deleteRadarItem(@Req() req: Request, @Param('radarId') radarId: string) {
        const userId: number = req['user'].id
        const response = await this.radarService.delete(+radarId, userId)
        return response
    }

    @Sse('sse/notifications')
    async notifications(@Req() request: Request) {
         const userId = request['user'].id;
        const subject = new Subject();
        const radarListener = `radar.${userId}`;
        const updateRadaritems = await this.radarService.updateRadarItems(+userId)
        return interval(30000).pipe(map((_) => {
            return { data: updateRadaritems }
        }));

        /* this.eventEmitter.on(radarListener, (radarItem) => {
            subject.next(radarItem);
        });
        return subject.pipe(map((radarItem) => ({ data: radarItem }))); */
    }

}
