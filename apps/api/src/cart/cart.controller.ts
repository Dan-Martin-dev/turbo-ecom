// monorepo-ecom/backend/src/cart/cart.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  UsePipes,
  Request 
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AddToCartDto, AddToCartSchema } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard) // <-- SECURE THE ENTIRE CONTROLLER
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: any): Promise<any> {
    return this.cartService.getCart(req.user.sub);
  }

  @Post('items')
  @UsePipes(new ZodValidationPipe(AddToCartSchema))
  addToCart(@Request() req: any, @Body() addToCartDto: AddToCartDto): Promise<any> {
    return this.cartService.addToCart(req.user.sub, addToCartDto);
  }

  @Patch('items/:itemId')
  updateCartItem(
    @Request() req: any,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ): Promise<any> {
    return this.cartService.updateCartItem(req.user.sub, itemId, quantity);
  }

  @Delete('items/:itemId')
  removeFromCart(@Request() req: any, @Param('itemId') itemId: string): Promise<any> {
    return this.cartService.removeFromCart(req.user.sub, itemId);
  }

  @Delete()
  clearCart(@Request() req: any): Promise<any> {
    return this.cartService.clearCart(req.user.sub);
  }
}