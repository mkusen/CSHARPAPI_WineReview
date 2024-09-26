namespace CSHARPAPI_WineReview.Misc
{
    public class NumberWithDirectionModel
    {
        public int Number { get; set; }

        // true - line, false - without line
        public bool Left { get; set; }
        public bool Right { get; set; }
        public bool Up { get; set; }
        public bool Down { get; set; }

        //color for number field 
        public string? Color { get; set; }

        public string? Position { get; set; }
    }
}
