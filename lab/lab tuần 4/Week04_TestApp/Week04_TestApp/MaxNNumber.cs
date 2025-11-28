using System;
using System.Linq;

namespace Week04_TestApp
{
    public class MaxNNumber
    {
        public static int FindMax(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                throw new Exception("Chuoi rong!");

            string[] parts = input.Split(new char[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 0) throw new Exception("Khong co so nao trong chuoi!");

            var numbers = parts.Select(p =>
            {
                if (int.TryParse(p, out int n))
                    return n;
                else
                    throw new Exception("Co ky tu khong phai so!");
            }).ToList();

            return numbers.Max();
        }
    }
}
