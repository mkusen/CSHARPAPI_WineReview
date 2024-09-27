
using CSHARPAPI_WineReview.Misc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSHARPAPI_WineReview.Controllers
{
    public class CiklicnaController : ControllerBase
    {


        [HttpGet]
        [Route("api/v1/[controller]")]
        public IActionResult GetSpiralMatrix(int rows, int cols)
        {

            // Inicijalizacija matrice
            NumberWithDirectionModel[,] matrix = new NumberWithDirectionModel[rows, cols];

            int num = 1;
            int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

            // Popunjavanje matrice u spiralnom poretku
            while (top <= bottom && left <= right)
            {

                // Popunjavanje donjeg reda zdesna nalijevo
                if (top <= bottom)
                {
                    for (int i = right; i >= left; i--)
                    {
                        // prvi broj
                        if (num== 1)
                        {
                            matrix[bottom, i] = new NumberWithDirectionModel
                            {
                                Number = num++,
                                Left = i != left,    // Lijevo true
                                Right = i != right,  // Desno false
                                Up = i == left,      // Gore false
                                Down = false,        // Dolje false
                                Color = "#FFFFFFFF",
                                Position = "RTL"
                            };

                        }
                        //ostali brojevi
                        else
                        {
                            matrix[bottom, i] = new NumberWithDirectionModel
                            {
                                Number = num++,
                                Left = i != left,    // Lijevo true ako nije zadnji broj
                                Right = true,  // Desno true ako nije prvi broj u redu
                                Up = i == left,     // Gore true ako je zadnji u redu
                                Down = false,        // Uvijek false
                                Color = "#FF000000",
                                Position = "RTL"
                            };
                        }
                        
                    }
                    bottom--;
                }

                // Popunjavanje lijeve kolone odozdo prema gore
                if (left <= right)
                {
                    for (int i = bottom; i >= top; i--)
                    {
                        matrix[i, left] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = false,         // Uvijek false, prva kolona
                            Right = i == left,   // Desno false ako nije zadnja kolona
                            Up = i != top,        // Gore true ako nije zadnji broj
                            Down = i < right,    // Dolje uvijek true 
                            Color = "#FF000000",
                            Position = "up"
                        };
                    }
                    left++;
                }

                // Popunjavanje gornjeg reda slijeva nadesno
                for (int i = left; i <= right; i++)
                {
                    matrix[top, i] = new NumberWithDirectionModel
                    {
                        Number = num++,
                        Left = true,            // Lijevo uvijek true
                        Right = i != right,    // Desna strana samo ako nije zadnji broj
                        Up = false,             //uvijek false
                        Down = i == right,  // Dolje false ako nismo na zadnjem redu
                        Color = "#FF000000",
                        Position = "LTR"
                    };
                }
                top++;

                // Popunjavanje desne kolone odozgo prema dolje
                for (int i = top; i <= bottom; i++)
                {
                    matrix[i, right] = new NumberWithDirectionModel
                    {
                        Number = num++,
                        Left = i == bottom,   // Lijevo ako nije posljednja kolona
                        Right = false,          // Uvijek false, zadnja kolona
                        Up = true,          // Uvijek true
                        Down = i != bottom,     // Dolje ako nije zadnji broj
                        Color = "#FF000000",
                        Position = "down"
                    };
                }
                right--;

            }

            // Serijalizacija sa Newtonsoft.Json
            string jsonResult = JsonConvert.SerializeObject(matrix);

            // Vraćanje rezultata kao JSON string
            return Content(jsonResult, "application/json");

        }
    }
}
