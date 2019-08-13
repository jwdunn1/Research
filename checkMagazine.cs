using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace checkMagazine
{
  class Program
  {
    static void checkMagazine(string[] magazine, string[] note)
    {
      int j = 0;
      int nLen = note.Length;
      int mLen = magazine.Length;
      Array.Sort(note);
      Array.Sort(magazine);
      for (int i = 0; i < mLen && j < nLen; i++)
        if (note[j] == magazine[i]) j++;
      Console.WriteLine((j == nLen) ? "Yes" : "No");
    }

    static void Main(string[] args) {
      string[] mn = Console.ReadLine().Split(' ');
      int m = Convert.ToInt32(mn[0]);
      int n = Convert.ToInt32(mn[1]);
      string[] magazine = Console.ReadLine().Split(' ');
      string[] note = Console.ReadLine().Split(' ');
      checkMagazine(magazine, note);
    }
  }
}
