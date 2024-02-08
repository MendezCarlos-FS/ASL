package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now();
	formatted := now.Format(time.RFC3339);
	fmt.Println("Hello ASL!");
	fmt.Println(formatted);
}