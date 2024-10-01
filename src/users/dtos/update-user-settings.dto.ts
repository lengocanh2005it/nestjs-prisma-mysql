import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  readonly smsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly notificationsOn?: boolean;
}
