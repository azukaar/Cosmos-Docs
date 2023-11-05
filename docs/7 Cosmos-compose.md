# Cosmos-Compose

Cosmos-Compose files are a derivative of Docker-Compose. They can be described as both JSON or YML. They are used to describe the services that Cosmos will manage. They are very similar to Docker-Compose files, but with some Cosmos specific extensions, as well as some unsupported features removed.

The main difference is the addition of the `routes` section which is used to describe the reverse proxy configuration. The `routes` section is a list of `route` objects, which is the exact same than the one you will find in the configuration file.

Another difference, when using `Links`, Cosmos does not actually create docker links but instead creates a network and adds the containers to it. This is because docker links are deprecated and will be removed in the future.

Finally, cosmos-compose support an entire templating system called Whiskers. It is used to generate the final cosmos-compose file. You can see many examples of this in the [marketplace repository](https://github.com/azukaar/cosmos-Servapps-official)

Here's the complete description of Cosmos-Compose, and all supported parameters:

```go
type DockerServiceCreateRequest struct {
	Services map[string]ContainerCreateRequestContainer `json:"services"`
	Volumes []ContainerCreateRequestVolume `json:"volumes"`
	Networks map[string]ContainerCreateRequestNetwork `json:"networks"`
}

type ContainerCreateRequestContainer struct {
	Name 			string            `json:"container_name"`
	Image       string            `json:"image"`
	Environment []string `json:"environment"`
	Labels      map[string]string `json:"labels"`
	Ports       []string          `json:"ports"`
	Volumes     []mount.Mount          `json:"volumes"`
	Networks    map[string]struct {
		Aliases []string `json:"aliases,omitempty"`
		IPV4Address string `json:"ipv4_address,omitempty"`
		IPV6Address string `json:"ipv6_address,omitempty"`
	} `json:"networks"`
	Routes 			   []utils.ProxyRouteConfig          `json:"routes"`

	RestartPolicy  string            `json:"restart,omitempty"`
	Devices        []string          `json:"devices"`
	Expose 		     []string          `json:"expose"`
	DependsOn      []string          `json:"depends_on"`
	Tty            bool              `json:"tty,omitempty"`
	StdinOpen      bool              `json:"stdin_open,omitempty"`

	Command string `json:"command,omitempty"`
	Entrypoint string `json:"entrypoint,omitempty"`
	WorkingDir string `json:"working_dir,omitempty"`
	User string `json:"user,omitempty"`
	Hostname string `json:"hostname,omitempty"`
	Domainname string `json:"domainname,omitempty"`
	MacAddress string `json:"mac_address,omitempty"`
	Privileged bool `json:"privileged,omitempty"`
	NetworkMode string `json:"network_mode,omitempty"`
	StopSignal string `json:"stop_signal,omitempty"`
	StopGracePeriod int `json:"stop_grace_period,omitempty"`
	HealthCheck struct {
		Test []string `json:"test"`
		Interval int `json:"interval"`
		Timeout int `json:"timeout"`
		Retries int `json:"retries"`
		StartPeriod int `json:"start_period"`
	} `json:"healthcheck,omitempty"`
	DNS []string `json:"dns,omitempty"`
	DNSSearch []string `json:"dns_search,omitempty"`
	ExtraHosts []string `json:"extra_hosts,omitempty"`
	Links []string `json:"links,omitempty"`
	SecurityOpt []string `json:"security_opt,omitempty"`
	StorageOpt map[string]string `json:"storage_opt,omitempty"`
	Sysctls map[string]string `json:"sysctls,omitempty"`
	Isolation string `json:"isolation,omitempty"`

	CapAdd []string `json:"cap_add,omitempty"`
	CapDrop []string `json:"cap_drop,omitempty"`
	SysctlsMap map[string]string `json:"sysctls,omitempty"`
}

type ContainerCreateRequestVolume struct {
	// name must be unique
	Name string `json:"name"`
	Driver string `json:"driver"`
	Source string `json:"source"`
	Target string `json:"target"`
}

type ContainerCreateRequestNetwork struct {
	// name must be unique
	Name string `json:"name"`
	Driver string `json:"driver"`
	Attachable bool `json:"attachable"`
	Internal bool `json:"internal"`
	EnableIPv6 bool `json:"enable_ipv6"`
	IPAM struct {
		Driver string `json:"driver"`
		Config []struct {
			Subnet string `json:"subnet"`
		} `json:"config"`
	} `json:"ipam"`
}
```