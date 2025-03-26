"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"
import { Smile, Youtube, Download, Play, Settings, Video, Scissors, FileVideo, Info, Sparkles } from "lucide-react"

export default function Home() {
  const [youtubeLink, setYoutubeLink] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [resultVideo, setResultVideo] = useState("")

  // Smile Detection Parameters
  const [smileDurationThreshold, setSmileDurationThreshold] = useState(0.8)
  const [skipDuration, setSkipDuration] = useState(10)
  const [faceScaleFactor, setFaceScaleFactor] = useState(1.1)
  const [faceMinNeighbors, setFaceMinNeighbors] = useState(5)
  const [smileScaleFactor, setSmileScaleFactor] = useState(1.1)
  const [smileMinNeighbors, setSmileMinNeighbors] = useState(20)
  const [clipDuration, setClipDuration] = useState(1.0)

  // Video Processing Parameters
  const [numThreads, setNumThreads] = useState(4)
  const [videoFormat, setVideoFormat] = useState("mp4")
  const [videoQuality, setVideoQuality] = useState("1080")
  const [videoDownloadFormat, setVideoDownloadFormat] = useState("best[height<=1080]")

  // Random Clip Parameters
  const [randomClipDuration, setRandomClipDuration] = useState(2.0)
  const [numRandomClips, setNumRandomClips] = useState(9)

  // File Output Parameters
  const [outputFormat, setOutputFormat] = useState("mp4")
  const [gifOptimization, setGifOptimization] = useState(true)
  const [mp4Codec, setMp4Codec] = useState("mp4v")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!youtubeLink) return

    // Simulate processing
    setIsProcessing(true)
    setProgress(0)
    setStatus("Initializing...")

    const steps = [
      "Downloading YouTube video...",
      "Detecting faces...",
      "Analyzing smile patterns...",
      "Extracting smile clips...",
      "Compiling video segments...",
      "Applying final touches...",
      "Finalizing...",
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep])
        setProgress(Math.min(100, Math.floor((currentStep + 1) * (100 / steps.length))))
        currentStep++
      } else {
        clearInterval(interval)
        setIsProcessing(false)
        setResultVideo("/placeholder.svg?height=720&width=1280")
      }
    }, 1200)
  }

  const ParameterTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center">
            {children}
            <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-400/10 dark:bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        {/* Header */}
        <header className="flex flex-col items-center justify-center text-center mb-12 mt-8">
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-300/30 dark:bg-yellow-300/20 rounded-full blur-md animate-pulse"></div>
            <Smile
              className="h-12 w-12 text-violet-600 dark:text-violet-400 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-300 dark:to-indigo-400">
              SmileClip
            </h1>
            <Sparkles className="h-6 w-6 text-amber-500 dark:text-amber-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
            Create a smile compilation video from any YouTube video with advanced customization
          </p>
        </header>

        {/* Input Section */}
        <Card className="mb-8 border-none shadow-xl bg-white/90 backdrop-blur-md dark:bg-gray-800/90 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="youtube-link"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  YouTube Video Link
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="youtube-link"
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="pl-10 border-2 focus:border-violet-500 dark:focus:border-violet-400 transition-all"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="smile" className="mb-6">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="smile" className="flex items-center gap-2">
                    <Smile className="h-4 w-4" />
                    <span className="hidden sm:inline">Smile Detection</span>
                    <span className="inline sm:hidden">Smile</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span className="hidden sm:inline">Video Processing</span>
                    <span className="inline sm:hidden">Video</span>
                  </TabsTrigger>
                  <TabsTrigger value="clips" className="flex items-center gap-2">
                    <Scissors className="h-4 w-4" />
                    <span className="hidden sm:inline">Random Clips</span>
                    <span className="inline sm:hidden">Clips</span>
                  </TabsTrigger>
                  <TabsTrigger value="output" className="flex items-center gap-2">
                    <FileVideo className="h-4 w-4" />
                    <span className="hidden sm:inline">File Output</span>
                    <span className="inline sm:hidden">Output</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="smile"
                  className="space-y-4 border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ParameterTooltip content="Minimum duration (in seconds) of consecutive smile frames to be considered a valid smile">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Smile Duration Threshold: {smileDurationThreshold}s
                        </label>
                      </ParameterTooltip>
                      <Slider
                        value={[smileDurationThreshold]}
                        onValueChange={(value) => setSmileDurationThreshold(value[0])}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="py-4"
                      />
                    </div>

                    <div>
                      <ParameterTooltip content="Time to skip after detecting a smile to avoid duplicate clips">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Skip Duration: {skipDuration}s
                        </label>
                      </ParameterTooltip>
                      <Slider
                        value={[skipDuration]}
                        onValueChange={(value) => setSkipDuration(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced-smile">
                      <AccordionTrigger className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Advanced Smile Detection Parameters
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-6 pt-2">
                          <div>
                            <ParameterTooltip content="Haar Cascade face detection parameter - smaller values detect more faces but may include false positives">
                              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Face Scale Factor: {faceScaleFactor}
                              </label>
                            </ParameterTooltip>
                            <Slider
                              value={[faceScaleFactor]}
                              onValueChange={(value) => setFaceScaleFactor(value[0])}
                              min={1.01}
                              max={1.5}
                              step={0.01}
                              className="py-4"
                            />
                          </div>

                          <div>
                            <ParameterTooltip content="Haar Cascade face detection parameter - higher values reduce false positives">
                              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Face Min Neighbors: {faceMinNeighbors}
                              </label>
                            </ParameterTooltip>
                            <Slider
                              value={[faceMinNeighbors]}
                              onValueChange={(value) => setFaceMinNeighbors(value[0])}
                              min={1}
                              max={10}
                              step={1}
                              className="py-4"
                            />
                          </div>

                          <div>
                            <ParameterTooltip content="Haar Cascade smile detection parameter - smaller values detect more smiles but may include false positives">
                              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Smile Scale Factor: {smileScaleFactor}
                              </label>
                            </ParameterTooltip>
                            <Slider
                              value={[smileScaleFactor]}
                              onValueChange={(value) => setSmileScaleFactor(value[0])}
                              min={1.01}
                              max={1.5}
                              step={0.01}
                              className="py-4"
                            />
                          </div>

                          <div>
                            <ParameterTooltip content="Haar Cascade smile detection parameter - higher values reduce false positives">
                              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Smile Min Neighbors: {smileMinNeighbors}
                              </label>
                            </ParameterTooltip>
                            <Slider
                              value={[smileMinNeighbors]}
                              onValueChange={(value) => setSmileMinNeighbors(value[0])}
                              min={1}
                              max={50}
                              step={1}
                              className="py-4"
                            />
                          </div>

                          <div>
                            <ParameterTooltip content="Duration of saved clips before/after smile detection (in seconds)">
                              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                Clip Duration: {clipDuration}s
                              </label>
                            </ParameterTooltip>
                            <Slider
                              value={[clipDuration]}
                              onValueChange={(value) => setClipDuration(value[0])}
                              min={0.5}
                              max={5}
                              step={0.1}
                              className="py-4"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent
                  value="video"
                  className="space-y-4 border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ParameterTooltip content="Number of parallel processing threads to use">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Number of Threads: {numThreads}
                        </label>
                      </ParameterTooltip>
                      <Slider
                        value={[numThreads]}
                        onValueChange={(value) => setNumThreads(value[0])}
                        min={1}
                        max={16}
                        step={1}
                        className="py-4"
                      />
                    </div>

                    <div>
                      <ParameterTooltip content="Video quality to download (maximum height in pixels)">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Video Quality
                        </label>
                      </ParameterTooltip>
                      <Select value={videoQuality} onValueChange={setVideoQuality}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="360">360p</SelectItem>
                          <SelectItem value="480">480p</SelectItem>
                          <SelectItem value="720">720p</SelectItem>
                          <SelectItem value="1080">1080p (HD)</SelectItem>
                          <SelectItem value="1440">1440p (2K)</SelectItem>
                          <SelectItem value="2160">2160p (4K)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <ParameterTooltip content="Format of the downloaded video">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Video Format
                        </label>
                      </ParameterTooltip>
                      <Select value={videoFormat} onValueChange={setVideoFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp4">MP4</SelectItem>
                          <SelectItem value="webm">WebM</SelectItem>
                          <SelectItem value="mkv">MKV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <ParameterTooltip content="Advanced download format string for youtube-dl">
                        <label
                          htmlFor="download-format"
                          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                          Download Format String
                        </label>
                      </ParameterTooltip>
                      <Input
                        id="download-format"
                        value={videoDownloadFormat}
                        onChange={(e) => setVideoDownloadFormat(e.target.value)}
                        className="border-2 focus:border-violet-500 dark:focus:border-violet-400 transition-all"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="clips"
                  className="space-y-4 border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ParameterTooltip content="Duration of each random clip in seconds">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Random Clip Duration: {randomClipDuration}s
                        </label>
                      </ParameterTooltip>
                      <Slider
                        value={[randomClipDuration]}
                        onValueChange={(value) => setRandomClipDuration(value[0])}
                        min={0.5}
                        max={5}
                        step={0.1}
                        className="py-4"
                      />
                    </div>

                    <div>
                      <ParameterTooltip content="Number of random clips to extract per segment">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Number of Random Clips: {numRandomClips}
                        </label>
                      </ParameterTooltip>
                      <Slider
                        value={[numRandomClips]}
                        onValueChange={(value) => setNumRandomClips(value[0])}
                        min={1}
                        max={20}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="output"
                  className="space-y-4 border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ParameterTooltip content="Format of the output file">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Output Format
                        </label>
                      </ParameterTooltip>
                      <Select value={outputFormat} onValueChange={setOutputFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp4">MP4</SelectItem>
                          <SelectItem value="gif">GIF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {outputFormat === "mp4" && (
                      <div>
                        <ParameterTooltip content="Codec to use for MP4 output">
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            MP4 Codec
                          </label>
                        </ParameterTooltip>
                        <Select value={mp4Codec} onValueChange={setMp4Codec}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select codec" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mp4v">mp4v (Default)</SelectItem>
                            <SelectItem value="avc1">avc1 (H.264)</SelectItem>
                            <SelectItem value="hevc">hevc (H.265)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {outputFormat === "gif" && (
                      <div className="flex items-center space-x-2">
                        <ParameterTooltip content="Enable GIF optimization to reduce file size">
                          <div className="flex flex-col space-y-2">
                            <Label
                              htmlFor="gif-optimization"
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              GIF Optimization
                            </Label>
                            <Switch
                              id="gif-optimization"
                              checked={gifOptimization}
                              onCheckedChange={setGifOptimization}
                            />
                          </div>
                        </ParameterTooltip>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 hover:from-violet-700 hover:via-fuchsia-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 dark:from-violet-500 dark:via-fuchsia-400 dark:to-indigo-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                disabled={isProcessing || !youtubeLink}
              >
                {isProcessing ? "Processing..." : "Create Smile Compilation"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Processing Section */}
        {isProcessing && (
          <Card className="mb-8 border-none shadow-xl bg-white/90 backdrop-blur-md dark:bg-gray-800/90 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-pulse">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Settings className="h-5 w-5 animate-spin" />
                Processing
              </h2>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{status}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-500 dark:via-fuchsia-400 dark:to-indigo-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {resultVideo && (
          <Card className="mb-8 border-none shadow-xl bg-white/90 backdrop-blur-md dark:bg-gray-800/90 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Your Smile Compilation
              </h2>

              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mb-6 relative shadow-lg group">
                <img
                  src={resultVideo || "/placeholder.svg"}
                  alt="Smile compilation video preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="rounded-full w-16 h-16 flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white transform transition-transform duration-300 hover:scale-110">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Download className="h-5 w-5" />
                  Download Compilation
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 border-2 border-violet-500 text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-950/50 font-medium py-3 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Youtube className="h-5 w-5" />
                  Share to YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

