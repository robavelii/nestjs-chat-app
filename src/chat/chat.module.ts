import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './model/room/room.entity';
import { ConnectedUserEntity } from './model/connected-user/connected-user.entity';
import { MessageEntity } from './model/message/message.entity';
import { JoinedRoomEntity } from './model/joined-room/joined-room.entity';
import { ConnectedUserService } from './service/connected-user/connected-user.service';
import { JoinedRoomService } from './service/joined-room/joined-room.service';
import { MessageService } from './service/message/message.service';
import { RoomService } from './service/room-service/room.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      RoomEntity,
      ConnectedUserEntity,
      MessageEntity,
      JoinedRoomEntity,
    ]),
  ],
  providers: [
    ChatGateway,
    RoomService,
    ConnectedUserService,
    JoinedRoomService,
    MessageService,
  ],
})
export class ChatModule {}