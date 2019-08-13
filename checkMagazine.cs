using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Solution {
    static void checkMagazine(string[] magazine, string[] note) {
        int j = 0;
        int nLen = note.Length;
        int mLen = magazine.Length;
        Array.Sort(note);
        Array.Sort(magazine);
        for (int i = 0; i < mLen && j < nLen; i++)
            if (note[j] == magazine[i]) j++;
        Console.WriteLine((j == nLen)?"Yes":"No");
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
