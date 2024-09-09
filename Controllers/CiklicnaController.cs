
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSHARPAPI_WineReview.Controllers
{
    public class CiklicnaController : ControllerBase
    {

        public class NumberWithDirection
        {
            public int Number { get; set; }
            public List<bool> Directions { get; set; } // true - horizontal, false - vertical
        }

        public class Ciklicna
        {
            public NumberWithDirection[,] Matrix { get; set; }
        }

        [HttpGet]
        [Route("api/v1/[controller]")]
        public IActionResult GetSpiralMatrix(int rows, int cols)
        {
            // Inicijalizacija matrice
            NumberWithDirection[,] matrix = new NumberWithDirection[rows, cols];
            int num = 1;
            int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

            // Popunjavanje matrice u spiralnom poretku
            while (top <= bottom && left <= right)
            {
                // Popunjavanje donjeg reda zdesna nalijevo
                for (int i = right; i >= left; i--)
                {
                    matrix[bottom, i] = new NumberWithDirection
                    {
                        Number = num++,
                        Directions = new List<bool> { true, false } // horizontal, vertical
                    };
                }
                bottom--;

                // Popunjavanje lijeve kolone odozdo prema gore
                for (int i = bottom; i >= top; i--)
                {
                    matrix[i, left] = new NumberWithDirection
                    {
                        Number = num++,
                        Directions = new List<bool> { false, true } // vertical, horizontal
                    };
                }
                left++;

                // Popunjavanje gornjeg reda slijeva nadesno
                if (top <= bottom)
                {
                    for (int i = left; i <= right; i++)
                    {
                        matrix[top, i] = new NumberWithDirection
                        {
                            Number = num++,
                            Directions = new List<bool> { true, false } // horizontal, vertical
                        };
                    }
                    top++;
                }

                // Popunjavanje desne kolone odozgo prema dolje
                if (left <= right)
                {
                    for (int i = top; i <= bottom; i++)
                    {
                        matrix[i, right] = new NumberWithDirection
                        {
                            Number = num++,
                            Directions = new List<bool> { false, true } // vertical, horizontal
                        };
                    }
                    right--;
                }
            }

            // Kreiraj objekt Ciklicna i postavi matricu
            var matrixNumbers = new Ciklicna
            {
                Matrix = matrix
            };

            // Serijalizacija sa Newtonsoft.Json
            string jsonResult = JsonConvert.SerializeObject(matrixNumbers);

            // Vraćanje rezultata kao JSON string
            return Content(jsonResult, "application/json");
        }

    }

}   


