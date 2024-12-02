using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Assignment1AK.Models;

namespace Assignment_1_PROG3175_Console_App_AK
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var url = "https://assignment-2-prog-3175.vercel.app/";

            var validTimesOfDay = new List<string> { "Morning", "Afternoon", "Evening", "Night" };
            var validLanguages = new List<string> { "English", "French", "Spanish" };
            var validTones = new List<string> { "Formal", "Casual" };

            using (HttpClient client = new HttpClient())
            {
                await GetTimesOfDay(client, url);
                await GetLanguages(client, url);

                string time = Validate("Please enter a time of day:", validTimesOfDay);
                string language = Validate("Please enter a language:", validLanguages);
                string tone = Validate("Please enter a tone (Formal or Casual):", validTones);

                await GetGreeting(client, url, time, language, tone);
            }
        }

        static async Task GetTimesOfDay(HttpClient client, string url)
        {
            var endpoint = "timesOfDay";

            HttpResponseMessage getResponse = await client.GetAsync(url + endpoint);

            string jsonStringResult = await getResponse.Content.ReadAsStringAsync();

            Console.WriteLine("Response from /timesOfDay endpoint:");
            Console.WriteLine(jsonStringResult);

            List<string> timesOfDay = JsonSerializer.Deserialize<List<string>>(jsonStringResult);

            Console.WriteLine("Times of Day:");
            foreach (var timeOfDay in timesOfDay)
            {
                Console.WriteLine(timeOfDay);
            }
        }

        static async Task GetLanguages(HttpClient client, string url)
        {
            var endpoint = "languages";

            HttpResponseMessage getResponse = await client.GetAsync(url + endpoint);

            string jsonStringResult = await getResponse.Content.ReadAsStringAsync();

            Console.WriteLine("Response from /languages endpoint:");
            Console.WriteLine(jsonStringResult);

            List<string> languages = JsonSerializer.Deserialize<List<string>>(jsonStringResult);

            Console.WriteLine("\nLanguages:");
            foreach (var language in languages)
            {
                Console.WriteLine(language);
            }
        }

        static async Task GetGreeting(HttpClient client, string url, string timeOfDay, string language, string tone)
        {
            var endpoint = "greet";

            var greeting = new GreetingRequest
            {
                TimeOfDay = timeOfDay,
                Language = language,
                Tone = tone
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            string jsonStringResult = JsonSerializer.Serialize(greeting, options);

            var content = new StringContent(jsonStringResult, System.Text.Encoding.UTF8, "application/json");

            HttpResponseMessage postResponse = await client.PostAsync(url + endpoint, content);

            if (postResponse.IsSuccessStatusCode)
            {
                string postResponseString = await postResponse.Content.ReadAsStringAsync();

                var greetingResponse = JsonSerializer.Deserialize<GreetingResponse>(postResponseString, options);

                Console.WriteLine($"\nGreeting: {greetingResponse.GreetingMessage}");
            }
            else
            {
                string errorResponse = await postResponse.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {postResponse.StatusCode}, {errorResponse}");
            }
        }

        static string Validate(string prompt, List<string> validValues)
        {
            string input = "";
            bool valid = false;

            while (!valid)
            {
                Console.WriteLine(prompt);
                input = Console.ReadLine();

                if (validValues.Contains(input))
                {
                    valid = true;
                }
                else
                {
                    Console.WriteLine("Invalid input. Please try again.");
                }
            }

            return input;
        }
    }
}