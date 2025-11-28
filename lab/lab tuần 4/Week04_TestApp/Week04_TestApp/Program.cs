using System;

namespace Week04_TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("\n=== MENU ===");
                Console.WriteLine("1. Convert number to text (tieng Viet khong dau)");
                Console.WriteLine("2. Find max number in string");
                Console.WriteLine("3. Exit");
                Console.Write("Choose (1-3): ");
                int choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.Write("Nhap so: ");
                        string input = Console.ReadLine();
                        try
                        {
                            int number = int.Parse(input);
                            Console.WriteLine("=> " + ConvertNumber.ToVietnamese(number));
                        }
                        catch
                        {
                            Console.WriteLine("Loi: chi nhap so nguyen duong!");
                        }
                        break;

                    case 2:
                        Console.Write("Nhap chuoi so: ");
                        string s = Console.ReadLine();
                        try
                        {
                            int max = MaxNNumber.FindMax(s);
                            Console.WriteLine("=> So lon nhat: " + max);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Loi: " + ex.Message);
                        }
                        break;

                    case 3:
                        return;

                    default:
                        Console.WriteLine("Lua chon khong hop le!");
                        break;
                }
            }
        }
    }
}
