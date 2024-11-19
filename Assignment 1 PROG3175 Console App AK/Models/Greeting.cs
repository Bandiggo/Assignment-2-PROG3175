using System.Text.Json.Serialization;

namespace Assignment1AK.Models{
    public class Greeting
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("timeOfDay")]
        public string TimeOfDay { get; set; }

        [JsonPropertyName("language")]
        public string Language { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
