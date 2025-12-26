package types

type Admin struct {
	Username string `yaml:"username" json:"username"`
	Password string `yaml:"password" json:"password"`
}

type ConfigFile struct {
	Port      int    `yaml:"port"`
	JWTSecret string `yaml:"jwt-secret"`
	Admin     Admin  `yaml:"admin"`
}
