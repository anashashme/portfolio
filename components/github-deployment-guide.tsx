"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, Github, ExternalLink } from "lucide-react"

export default function GitHubDeploymentGuide() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Deployment <span className="text-primary">Guide</span>
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Deploying to GitHub Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="setup">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="build">Build & Deploy</TabsTrigger>
                  <TabsTrigger value="custom">Custom Domain</TabsTrigger>
                </TabsList>

                <TabsContent value="setup" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Create a GitHub Repository</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a new repository on GitHub named <code>username.github.io</code> (replace username with
                      your GitHub username).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Initialize Git in your project</h3>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
                        <code>
                          git init
                          <br />
                          git add .
                          <br />
                          git commit -m "Initial commit"
                        </code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard('git init\ngit add .\ngit commit -m "Initial commit"', "setup-1")
                        }
                      >
                        {copiedTab === "setup-1" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">3. Connect to GitHub</h3>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
                        <code>
                          git remote add origin https://github.com/username/username.github.io.git
                          <br />
                          git branch -M main
                          <br />
                          git push -u origin main
                        </code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            "git remote add origin https://github.com/username/username.github.io.git\ngit branch -M main\ngit push -u origin main",
                            "setup-2",
                          )
                        }
                      >
                        {copiedTab === "setup-2" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="build" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Build your project</h3>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
                        <code>npm run build</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard("npm run build", "build-1")}
                      >
                        {copiedTab === "build-1" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Deploy to GitHub Pages</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a new branch named <code>gh-pages</code> and push the contents of the <code>out</code>{" "}
                      directory.
                    </p>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
                        <code>
                          git add out/ -f
                          <br />
                          git commit -m "Deploy to GitHub Pages"
                          <br />
                          git subtree push --prefix out origin gh-pages
                        </code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            'git add out/ -f\ngit commit -m "Deploy to GitHub Pages"\ngit subtree push --prefix out origin gh-pages',
                            "build-2",
                          )
                        }
                      >
                        {copiedTab === "build-2" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">3. Configure GitHub Pages</h3>
                    <p className="text-muted-foreground mb-4">
                      Go to your repository settings, navigate to "Pages" section, and set the source to the gh-pages
                      branch.
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" /> GitHub Pages Documentation
                      </a>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Add a CNAME file</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a file named <code>CNAME</code> in the <code>public</code> directory with your domain name.
                    </p>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
                        <code>echo "yourdomain.com" &gt; public/CNAME</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard('echo "yourdomain.com" > public/CNAME', "custom-1")}
                      >
                        {copiedTab === "custom-1" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Configure DNS</h3>
                    <p className="text-muted-foreground mb-4">Add these DNS records at your domain registrar:</p>
                    <div className="bg-muted p-4 rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left">Type</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>A</td>
                            <td>@</td>
                            <td>185.199.108.153</td>
                          </tr>
                          <tr>
                            <td>A</td>
                            <td>@</td>
                            <td>185.199.109.153</td>
                          </tr>
                          <tr>
                            <td>A</td>
                            <td>@</td>
                            <td>185.199.110.153</td>
                          </tr>
                          <tr>
                            <td>A</td>
                            <td>@</td>
                            <td>185.199.111.153</td>
                          </tr>
                          <tr>
                            <td>CNAME</td>
                            <td>www</td>
                            <td>username.github.io</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">3. Enable HTTPS</h3>
                    <p className="text-muted-foreground mb-4">
                      In your repository settings, under the "Pages" section, check "Enforce HTTPS".
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" /> Custom Domain Documentation
                      </a>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
