import { IsString, MinLength, MaxLength, Matches, IsEmail, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class AuthCredentials {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too week',
  })
  @ApiProperty({
    default: 'Aa!@#123'
  })
  password: string;
}
export class SignUpDto extends AuthCredentials {
  @IsString()
  @ApiProperty({
    example: "Thu"
  })
  first_name: string;

  @IsEmail()
  @ApiProperty({
    example: "thupx@demo.com"
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: "Pham"
  })
  last_name: string

  @IsString()
  @ApiProperty({
    required: false,
    example: "29/1 82 Hoang Hoa Tham"
  })
  address: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: new Date(1998, 26, 2).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  })
  birth_date: Date
}
export class SignInDto extends AuthCredentials { }

export type SignedInData = {
  user: User;
  access_token: string;
}