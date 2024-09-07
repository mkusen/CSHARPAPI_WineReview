namespace CSHARPAPI_WineReview.Models
{
    public class Ciklicna
    {

        public static void Matrix()
        {


            while (true)
            {


                try
                {
                    Console.Write("upiši prvi cijeli pozitivni broj: ");
                    int rows = int.Parse(Console.ReadLine());

                    Console.Write("upiši drugi cijeli pozitivni broj: ");
                    int columns = int.Parse(Console.ReadLine());

                    Console.WriteLine("broj redova je {0}, broj stupaca je {1}", rows, columns);

                    //tablica koja sadrži brojeve između dva zadana
                    int[,] matrix = CreateSpiralMatrix(rows, columns);

                    //prebroji linije
                    for (int i = 0; i < rows; i++)
                    {
                        //prebroji stupce
                        for (int j = 0; j < columns; j++)
                        {
                            //ispisuje tablicu s redovima i stupcima
                            Console.Write(matrix[i, j] + "\t");
                        }
                        Console.WriteLine();
                    }


                    //popunjavanje tablice brojevima u spiralnom obliku
                    static int[,] CreateSpiralMatrix(int rows, int cols)
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

                        return matrix;
                    }
                }


                catch (Exception e)
                {

                    Console.WriteLine("nisi upisao cijeli pozitivni broj\n" + e.Message);
                }

            }

        }
    }

}
