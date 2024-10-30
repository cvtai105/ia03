using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IA03.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 

        [EmailAddress]
        public string Email { get; set; }
        public byte[] Hash { get; set; }        
    }
}