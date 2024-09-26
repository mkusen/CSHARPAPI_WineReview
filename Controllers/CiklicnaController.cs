
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
                for (int a = right; a >= left; a--)
                {
                    //prvi broj
                    if (a == right)
                    {
                        matrix[bottom, a] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = true,
                            Right = false,
                            Up = false,
                            Down = false,
                            Color = "#FFFFFFFF",
                            Position = "RTL"
                        };

                    }
                    //zadnji broj
                    else if (a == left)
                    {
                        matrix[bottom, a] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = false,
                            Right = true,
                            Up = true,
                            Down = false,
                            Color = "#FF000000",
                            Position = "RTL"
                        };
                    }

                    //svi između
                    else
                    {
                        matrix[bottom, a] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = true,
                            Right = true,
                            Up = false,
                            Down = false,
                            Color = "#FF000000",
                            Position = "RTL"
                        };

                    }

                }
                bottom--;


                // Popunjavanje lijeve kolone odozdo prema gore
                for (int b = bottom; b >= top; b--)
                {
                    //prvi broj
                    if (b == bottom)
                    {

                        matrix[b, left] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = false,
                            Right = false,
                            Up = true,
                            Down = true,
                            Color = "#FF000000",
                            Position = "up"
                        };
                    }

                    //zadnji broj
                    else if (b == top)
                    {
                        matrix[b, left] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = false,
                            Right = true,
                            Up = false,
                            Down = true,
                            Color = "#FF000000",
                            Position = "up"
                        };
                    }
                    //svi između
                    else
                    {
                        matrix[b, left] = new NumberWithDirectionModel
                        {
                            Number = num++,
                            Left = true,
                            Right = true,
                            Up = false,
                            Down = false,
                            Color = "#FF000000",
                            Position = "up"
                        };
                    }
                   
                }
                left++;

                // Popunjavanje gornjeg reda slijeva nadesno
                if (top <= bottom)
                {
                    for (int c = left; c <= right; c++)
                    {
                        //prvi broj
                        if (c == left)
                        {
                            matrix[top, c] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = true,
                                Right = true,
                                Up = false,
                                Down = false,
                                Color = "#FF000000",
                                Position = "LTR"
                            };
                        }
                        //zadnji broj
                        else if (c == right)
                        {
                            matrix[top, c] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = true,
                                Right = false,
                                Up = false,
                                Down = true,
                                Color = "#FF000000",
                                Position = "LTR"
                            };
                        }

                        //svi između
                        else
                        {
                            matrix[top, c] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = true,
                                Right = true,
                                Up = false,
                                Down = false,
                                Color = "#FF000000",
                                Position = "LTR"
                            };

                        }
                       
                    }
                    top++;

                }              

                // Popunjavanje desne kolone odozgo prema dolje
                if (left <= right)
                {
                    for (int d = top; d <= bottom; d++)
                    {

                        //prvi broj
                        if (d == top)
                        {
                            matrix[d, top] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = false,
                                Right = false,
                                Up = true,
                                Down = true,
                                Color = "#FF000000",
                                Position = "down"

                            };
                        }
                        //zadnji broj
                        else if (d == bottom)
                        {
                            matrix[d, top] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = true,
                                Right = false,
                                Up = true,
                                Down = false,
                                Color = "#FFFF0000",
                                Position = "down"

                            };
                        }

                        //svi između
                        else
                        {
                            matrix[d, top] = new NumberWithDirectionModel
                            {

                                Number = num++,
                                Left = false,
                                Right = false,
                                Up = true,
                                Down = true,
                                Color = "#FF000000",
                                Position = "down"

                            };
                        }                      
                    }
                    right--;
                }
                             

            }

            // Serijalizacija sa Newtonsoft.Json
            string jsonResult = JsonConvert.SerializeObject(matrix);

            // Vraćanje rezultata kao JSON string
            return Content(jsonResult, "application/json");

        }
    }
}





