import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, MapPin, BarChart3, Shield, Users, Eye, Target, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIInputSimulator from "@/components/AIInputSimulator";
import AIPipelineVisual from "@/components/AIPipelineVisual";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent blur-[80px]" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Governance Platform
            </div>
            {/* <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl"> */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Booth-Level Governance
              <br />
              <span className="bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Intelligence System
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70">
              Transforming citizen feedback into actionable governance insights.
              Real-time AI analysis of complaints mapped to every booth.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-accent border-0 text-accent-foreground shadow-lg hover:opacity-90">
                <Link to="/dashboard">
                  View Dashboard <BarChart3 className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#demo">
                  See Demo Data <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <ChevronDown className="h-6 w-6 animate-bounce text-primary-foreground/40" />
          </motion.div>
        </div>
      </section>


      {/* Stats */}
      <section className="border-b border-border bg-card py-8">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {[
            { label: "Booths Monitored", value: "9", icon: MapPin },
            { label: "Issues Tracked", value: "70+", icon: Eye },
            { label: "Blocks Covered", value: "3", icon: Target },
            { label: "AI Accuracy", value: "94%", icon: Brain },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Why Booth-Level Analytics Matter</h2>
            <p className="mt-3 text-muted-foreground">Bridging the gap between citizen complaints and government action</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "AI Text Analysis", desc: "NLP-powered classification of citizen complaints into actionable categories." },
              { icon: MapPin, title: "Micro-Level Mapping", desc: "Every issue mapped to specific booths for hyper-local governance." },
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Live dashboards showing issue trends, sentiment, and priority levels." },
              { icon: Shield, title: "Transparent Admin", desc: "Government response tracking with department-wise action status." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                {/* <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p> */}
                <p className="text-base md:text-lg text-gray-300 mt-3"></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Pipeline Visual */}
      <AIPipelineVisual />

      {/* Demo Input */}
      <section id="demo" className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Try AI Issue Analysis</h2>
            <p className="mt-3 text-muted-foreground">Enter a citizen complaint and watch AI process it in real-time</p>
          </div>
          <AIInputSimulator />
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Why This System Matters</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              { icon: Eye, title: "Real-Time Governance Intelligence", desc: "Immediate visibility into citizen issues at the grassroots level." },
              { icon: Target, title: "Better Resource Allocation", desc: "Data-driven deployment of government resources where needed most." },
              { icon: Users, title: "Micro-Level Decision Making", desc: "Booth-level granularity enables precise, localized interventions." },
              { icon: Shield, title: "Transparency in Administration", desc: "Public tracking of government response and resolution timelines." },
            ].map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex-shrink-0">
                  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-7 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                    <point.icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-bold text-primary-foreground">JanDrishti</span>
          </div>
          <p className="mt-2 text-sm text-primary-foreground/50">
            AI-Powered Booth Level Governance Intelligence System • Hackathon Prototype
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
