package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)

// generatePlayLink returns the URL for the playground link based on the
// source code that is provided.
func generatePlayLink(srcCode []byte) (string, error) {
	const url = "https://play.golang.org/share"
	const mime = "application/x-www-form-urlencoded; charset=UTF-8"

	// Make a call to the playground, posting the source code file contents.
	res, err := http.Post(url, mime, bytes.NewReader(srcCode))
	if err != nil {
		return "", err
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected playground status code: %d", res.StatusCode)
	}

	// read back the generated URL GUID for this source code.
	b, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("http://play.golang.org/p/%s", string(b)), nil
}

// TODO: turn it into array of bytes, and run through the function to get the URL
// TODO: put the URL into user's clipboard

func main() {
	// TODO: take string as argument to script
}
