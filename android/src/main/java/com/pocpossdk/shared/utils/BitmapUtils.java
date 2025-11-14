package com.pocpossdk.shared.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.util.Base64;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class BitmapUtils {

  public static List<Bitmap> split(Bitmap original, int maxHeight) {
    List<Bitmap> bitmaps = new ArrayList<>();
    int width = original.getWidth();
    int totalHeight = original.getHeight();

    int y = 0;
    while (y < totalHeight) {
      int height = Math.min(maxHeight, totalHeight - y);
      Bitmap bitmapPart = Bitmap.createBitmap(original, 0, y, width, height);
      bitmaps.add(bitmapPart);
      y += height;
    }

    return bitmaps;
  }

  public static Bitmap resize(Bitmap bitmap, int maxWidth) {
    if (bitmap.getWidth() <= maxWidth) {
      return bitmap;
    }

    int newHeight = (int) ((float) bitmap.getHeight() / bitmap.getWidth() * maxWidth);
    return Bitmap.createScaledBitmap(bitmap, maxWidth, newHeight, true);
  }

  public static Bitmap merge(Bitmap bitmap1, Bitmap bitmap2, int spacing) {
    if (bitmap1 == null)
      return bitmap2;
    if (bitmap2 == null)
      return bitmap1;

    int width = Math.max(bitmap1.getWidth(), bitmap2.getWidth());
    int height = bitmap1.getHeight() + bitmap2.getHeight() + spacing;

    Bitmap mergedBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);

    Canvas canvas = new Canvas(mergedBitmap);
    canvas.drawColor(Color.WHITE);
    canvas.drawBitmap(bitmap1, 0, 0, null);
    canvas.drawBitmap(bitmap2, 0, bitmap1.getHeight() + spacing, null);

    return mergedBitmap;
  }

  public static Bitmap base64ToBitmap(String base64Image) {
    try {
      byte[] bytes = Base64.decode(base64Image, Base64.DEFAULT);
      Bitmap bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
      return bitmap;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public static Bitmap center(Bitmap bitmap, int totalWidth) {
    int originalWidth = bitmap.getWidth();
    int originalHeight = bitmap.getHeight();

    if (originalWidth >= totalWidth) {
      return bitmap;
    }

    Bitmap centeredBitmap = Bitmap.createBitmap(totalWidth, originalHeight, Bitmap.Config.ARGB_8888);
    Canvas canvas = new Canvas(centeredBitmap);
    canvas.drawColor(Color.WHITE);

    int offsetX = (totalWidth - originalWidth) / 2;
    canvas.drawBitmap(bitmap, offsetX, 0, null);

    return centeredBitmap;
  }

  public static Bitmap addBottomMargin(Bitmap originalBitmap, int marginPixels) {
    int originalWidth = originalBitmap.getWidth();
    int originalHeight = originalBitmap.getHeight();
    int newHeight = originalHeight + marginPixels;

    Bitmap bitmapWithMargin = Bitmap.createBitmap(originalWidth, newHeight, Bitmap.Config.ARGB_8888);

    Canvas canvas = new Canvas(bitmapWithMargin);

    canvas.drawColor(Color.WHITE);
    canvas.drawBitmap(originalBitmap, 0, 0, null);

    return bitmapWithMargin;
  }

  public static void recycle(Bitmap bitmap) {
    if (bitmap != null && !bitmap.isRecycled()) {
      bitmap.recycle();
    }
  }
}
