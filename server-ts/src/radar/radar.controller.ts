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
        let updatedRadaritems = await this.radarService.updateRadarItems(+userId)
        this.eventEmitter.on(radarListener, async () => {
            updatedRadaritems = await this.radarService.updateRadarItems(+userId)
            subject.next(updatedRadaritems)
        })

        return subject.pipe(map((_) => {

            return { data: updatedRadaritems }
        }));


        /*  this.eventEmitter.on(radarListener, (radarItem) => {
             subject.next(radarItem);
         });
         return subject.pipe(map((radarItem) => ({ data: radarItem }))); */
    }


    @Sse('sse/emitter')
    async eventEmitterForRadar(@Req() request: Request) {
        const userId = request['user'].id;
        const radarListener = `radar.${userId}`;

        return interval(60000).pipe(map((_) => {
            this.eventEmitter.emit(radarListener);
        }));

    }
}
