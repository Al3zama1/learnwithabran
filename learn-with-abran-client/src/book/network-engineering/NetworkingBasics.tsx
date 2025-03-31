const NetworkDevices = () => {
  return (
    <article className="article">
      <h1>Networking Basics</h1>
      <p>
        A computer network is a digital telecommunications network, which consists of two or more devices that are linked in order to share resources.
        Devices on a network may be linked through cables, telephone lines, radio waves, or other methods.
      </p>
      <h2>Local Area Network (LAN)</h2>
      <p>
        A Local Area Network (LAN) is a network that is geographically limited to a small area, such as a school or building. Devices in the same LAN can 
        communicate directly with each other without leaving the network.
      </p>
      <h2>Client/Server</h2>
      <p>
        End devices communicating over a network are usually referred to as clients and servers. For example, your browser is acting as a client and my website is behaving as a server - your browser sends requests and my website responds to those requests.
      </p>
      <ul>
        <li>
          <strong>Client</strong>: A client is a device that accesses a service made available by a server.
        </li>
        <li>
          <strong>Server</strong>: A server is a device that provides functions or services for clients.
        </li>
      </ul>
      <p className="important">
        Keep in mind that the client and server roles are interchangeable. It all depends on what device initiated the communication flow.
      </p>

      <h2>Network Devices</h2>
      <p>
        Have you ever wondered, how your data travel from your personal electronic device to another device that could be miles away? Better yet, how does your data know exactly
        what path to take and its intendent recipient? Networks are composed of intermediary network-specific devices equipped with special hardware and software, each with a specific responsibility in the overall 
        movement of data, as well as security.
      </p>

      <h3>Switches</h3>
      <p>
        The primary functionallity of switches is switching, which is the process of sharing resources within networks.
      </p>
      <ul>
        <li>
          Swithces have many network interfaces/ports for end hosts to connect to (usually 24+).
        </li>
        <li>
          Provide connectivity to hosts within the same LAN (Local Area Network) and not between LANs.
        </li>
      </ul>

      <h3>Routers</h3>
      <p>
        The primary functionality of routers is routing, which is the process of sharing resources between networks.
      </p>
      <ul>
        <li>
          Routers have fewer interfaces than switches.
        </li>
        <li>
          Routers are used to provide connectivity between LANs.
        </li>
      </ul>

      <h3>Firewalls</h3>
      <p>
        Firewalls are special network security devices that control network traffic entering and exiting networks.
      </p>
      <ul>
        <li>
          Network firewalls are hardware devices that filter traffic between networks.
        </li>
        <li>
          Can be placed inside or outside a network.
        </li>
        <li>
          Monitor and control network traffic based on configuration rules.
        </li>
        <li>
          Firewalls are knows as <strong>next-generation firewalls</strong> when they include more modern and advanced filtering capabilities.
        </li>
      </ul>
      <p className="important">
        There is another type of firewall called <strong>host-based firewall</strong>, which is a software based firewall that filters traffic entering and exiting 
        a host machine, like a computer. Even in a network with a hardware firewall, each host should include a host-based firewall as an extra line of defense.
      </p>
    </article>
  )
}

export default NetworkDevices