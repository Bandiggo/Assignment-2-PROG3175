using System.Text.Json.Serialization;
public class GreetingResponse
{
    [JsonPropertyName("greetingMessage")]
    public string? GreetingMessage { get; set; }
}