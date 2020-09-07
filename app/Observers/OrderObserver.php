<?php

namespace App\Observers;

use App\Order;

class OrderObserver
{
  /**
   * Handle the order "created" event.
   *
   * @param \App\Order $order
   * @return void
   */
  public function created(Order $order)
  {
    //
  }

  /**
   * Handle the order "updated" event.
   *
   * @param \App\Order $order
   * @return void
   */
  public function updated(Order $order)
  {
    // when adding products
    $products = $order->products()->get();
    $amount = 0;
    foreach ($products as $product) {
      $amount = $amount + $product->price * $product->pivot->qty;
    }
    $order->update([
      'amount' => $amount
    ]);
  }

  /**
   * Handle the order "deleted" event.
   *
   * @param \App\Order $order
   * @return void
   */
  public function deleted(Order $order)
  {
    //
  }

  /**
   * Handle the order "restored" event.
   *
   * @param \App\Order $order
   * @return void
   */
  public function restored(Order $order)
  {
    //
  }

  /**
   * Handle the order "force deleted" event.
   *
   * @param \App\Order $order
   * @return void
   */
  public function forceDeleted(Order $order)
  {
    //
  }
}
