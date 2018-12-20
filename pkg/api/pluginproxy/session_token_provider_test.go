package pluginproxy

import (
	"context"
	"testing"
	//"time"

	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/plugins"
	. "github.com/smartystreets/goconvey/convey"
)

func TestSessionToken(t *testing.T) {
	Convey("Plugin with token auth route", t, func() {
		pluginRoute := &plugins.AppPluginRoute{
			Path:   "pathwithtoken",
			Url:    "https://api.example.io/some/path",
			Method: "GET",
			TokenAuth: &plugins.JwtTokenAuth{
				Url: "{{.JsonData.logInsightHost}}/api/v1/sessions",
				Params: map[string]string{
					"username": "{{.JsonData.username}}",
					"password": "{{.SecureJsonData.password}}",
				},
			},
		}

		templateData := templateData{
			JsonData: map[string]interface{}{
				"username":       "user",
				"logInsightHost": "http://localhost:8080",
			},
			SecureJsonData: map[string]string{
				"password": "password",
			},
		}

		ds := &models.DataSource{Id: 1, Version: 2}

		Convey("should fetch token using username and password", func() {
			getSessionTokenSource = func(ctx context.Context, token string) (string, error) {
				return "abc", nil
			}
			provider := newSessionTokenProvider(ds, pluginRoute)
			token, err := provider.getSessionToken(templateData)
			So(err, ShouldBeNil)

			So(token, ShouldEqual, "abc")
		})

	})
}
