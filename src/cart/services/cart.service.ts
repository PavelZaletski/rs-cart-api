import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items = [] }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    console.log('items =>', items);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    console.log('this.userCarts =>', this.userCarts);

    this.userCarts[ userId ] = { ...updatedCart };

    console.log('this.userCarts =>', this.userCarts);

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
