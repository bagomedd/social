package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Printf("Server started")
	http.HandleFunc("/api/profile/b0gam", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		//http.ServeFile(w, r, "index.html")
		// http.Error(w, "HELLO MIR ERROR SUKA", 502) // hz ne rabotaet (?)

		// transport := new(http.Transport)
		// client := new(http.Client)

		// http.Client.Transport
		// http.ost()

		// ID - спорное поле, скорее всего по нему и будут парситься
		text := []byte(`
		{
			"userId" : "b0gam",
			"username": "bogamchik",
			"description" : "Hello it's my page!",
			"birthday" : "11.09.2001",
			"avatarURL" : "https://amazon",
			"isOwnProfile" : true,
			"followersCount" : 10000,
		}
		`)
		w.Write(text)
		fmt.Printf("/api  Request handled\n")
	})

	http.HandleFunc("/api/profile/fekov", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		//http.ServeFile(w, r, "index.html")
		// http.Error(w, "HELLO MIR ERROR SUKA", 502) // hz ne rabotaet (?)

		// transport := new(http.Transport)
		// client := new(http.Client)

		// http.Client.Transport
		// http.ost()

		// ID - спорное поле, скорее всего по нему и будут парситься
		text := []byte(`
		{
			"userId" : "fekov",
			"username": "AndreyVorobey",
			"description" : "Sam podumay",
			"birthday" : "14.88.2005",
			"avatarURL" : "/images/fekov.jpg",
			"isOwnProfile" : false,
			"followersCount" : 0,
		}
		`)
		w.Write(text)
		fmt.Printf("/api  Request handled\n")
	})

	http.HandleFunc("/api/post/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		text := []byte(`
		{
		"text" : "Privet eto moi perviy post",
		"media": [
			"http://localhost:1488/media/media_0",
			"http://localhost:1488/media/media_1",
			"http://localhost:1488/media/media_2",
			"http://localhost:1488/media/media_3"
		],
		"music" : [
			"http://localhost:1488/music/music_0",
			"http://localhost:1488/music/music_1",
			"http://localhost:1488/music/music_2"
		]
		}
		`)
		w.Write(text)
		fmt.Printf("/post Request handled\n")
	})

	http.ListenAndServe(":1488", nil)
}
