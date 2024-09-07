﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CSHARPAPI_WineReview.Controllers
{
    public class CiklicnaController : ControllerBase
    {
       


        [HttpGet]

        public Task<IActionResult> Get(int rows, int cols)
        {
            

                int[,] matrix = new int[rows, cols];
                int num = 1;
                int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

            while (top <= bottom && left <= right)
            {
                // Popunjavanje donjeg reda zdesna nalijevo
                for (int i = right; i >= left; i--) matrix[bottom, i] = num++;
                bottom--;

                // Popunjavanje lijeve kolone odozdo prema gore
                for (int i = bottom; i >= top; i--) matrix[i, left] = num++;
                left++;

                // Popunjavanje gornjeg reda slijeva nadesno
                if (top <= bottom)
                {
                    for (int i = left; i <= right; i++) matrix[top, i] = num++;
                    top++;
                }

                // Popunjavanje desne kolone odozgo prema dolje
                if (left <= right)
                {
                    for (int i = top; i <= bottom; i++) matrix[i, right] = num++;
                    right--;
                }
              
               
            }

    //napraviti objekt od broja (DTO)
    //za smjerove kretanja true i false vrijednosti
  

        }

    }
}
