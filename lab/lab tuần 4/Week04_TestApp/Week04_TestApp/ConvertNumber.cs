using System;

namespace Week04_TestApp
{
    public class ConvertNumber
    {
        private static readonly string[] ones =
        { "khong", "mot", "hai", "ba", "bon", "nam", "sau", "bay", "tam", "chin" };

        public static string ToVietnamese(int num)
        {
            if (num < 0) return "Khong hop le (so am)";
            if (num == 0) return "khong";
            if (num > 9999) return "Khong ho tro (qua lon)";

            string result = "";
            if (num >= 1000)
            {
                int nghin = num / 1000;
                result += ones[nghin] + " nghin ";
                num %= 1000;
            }
            if (num >= 100)
            {
                int tram = num / 100;
                result += ones[tram] + " tram ";
                num %= 100;
                if (num > 0 && num < 10) result += "le ";
            }
            if (num >= 10)
            {
                int chuc = num / 10;
                result += ones[chuc] + " muoi ";
                num %= 10;
            }
            if (num > 0) result += ones[num];
            return result.Trim();
        }
    }
}
