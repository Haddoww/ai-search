# 🤖 Context-Aware Code Editor Agent

An intelligent agentic AI system that autonomously interprets development goals, plans multi-step workflows, and delivers comprehensive code enhancements through natural language interaction.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Streamlit](https://img.shields.io/badge/Streamlit-1.0+-red.svg)
![OpenAI](https://img.shields.io/badge/OpenAI-API-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Overview

This project implements a **plan-execute agentic architecture** that acts as an intelligent coding assistant. Unlike simple code completion tools, this agent understands high-level goals, autonomously plans multi-step solutions, and orchestrates various tools to refactor code, generate tests, handle errors, and create documentation.

## ✨ Key Features

### 🎯 Autonomous Planning & Execution
- Interprets natural language development goals
- Creates multi-step execution plans
- Orchestrates tool chains to accomplish complex tasks
- Adapts strategy based on code context

### 🛠️ Intelligent Code Tools
- **Code Refactoring**: Automatically improves code structure, readability, and performance
- **Test Case Generation**: Creates comprehensive unit tests based on code analysis
- **Error Handling**: Identifies potential issues and implements robust error management
- **Documentation**: Generates clear, contextual documentation

### 📄 Google Docs Integration
- Secure OAuth 2.0 authentication
- Automated documentation generation
- Direct export of code analysis and enhancement reports
- Seamless cloud storage integration

### 🎨 Interactive Streamlit UI
- Drag-and-drop file upload functionality
- Interactive goal-setting interface
- Real-time visualization of AI workflows
- Step-by-step enhancement tracking
- Progress indicators for long-running tasks

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Streamlit Frontend                       │
│  (File Upload • Goal Input • Workflow Visualization)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Agentic Planning Layer                      │
│           (Goal Interpretation • Plan Generation)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│   OpenAI    │ │   Tool     │ │  Google    │
│     API     │ │  Executor  │ │  Docs API  │
│  (GPT-4)    │ │  Engine    │ │  (OAuth)   │
└─────────────┘ └────────────┘ └────────────┘
```

### Core Components

1. **Planning Agent**: Analyzes user goals and creates step-by-step execution plans
2. **Tool Orchestrator**: Manages and sequences tool execution
3. **Code Analyzer**: Understands code context and structure
4. **Enhancement Engine**: Applies refactoring, testing, and error handling
5. **Documentation Generator**: Creates comprehensive documentation artifacts

## 🚀 Getting Started

### Prerequisites
```bash
Python 3.8+
OpenAI API Key
Google Cloud Project with Docs API enabled
OAuth 2.0 Credentials
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/context-aware-code-agent.git
cd context-aware-code-agent
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials:
# OPENAI_API_KEY=your_openai_api_key
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Configure Google OAuth**
- Place your `credentials.json` file in the project root
- First run will trigger OAuth flow to generate `token.json`

### Running the Application
```bash
streamlit run app.py
```

Navigate to `http://localhost:8501` in your browser.

## 📖 Usage

### Basic Workflow

1. **Upload Code Files**
   - Drag and drop Python files or use the file browser
   - Supports single files or entire directories

2. **Set Development Goals**
   - Enter natural language goals (e.g., "Refactor this code for better performance and add comprehensive tests")
   - Agent interprets and creates an execution plan

3. **Review Plan**
   - Visualize the multi-step plan before execution
   - Modify or approve the proposed approach

4. **Execute & Monitor**
   - Watch real-time progress as tools are orchestrated
   - See intermediate results at each step

5. **Export Results**
   - Download enhanced code files
   - Generate Google Doc reports with full documentation

### Example Goals
```python
# Goal 1: Comprehensive Enhancement
"Refactor this code following PEP 8 standards, add type hints, 
generate unit tests with 80%+ coverage, and create documentation"

# Goal 2: Error Hardening
"Add comprehensive error handling, input validation, and logging 
to make this production-ready"

# Goal 3: Performance Optimization
"Analyze performance bottlenecks and refactor for better efficiency 
while maintaining functionality"
```

## 🛠️ Technical Stack

| Component | Technology |
|-----------|-----------|
| **Language** | Python 3.8+ |
| **AI/LLM** | OpenAI GPT-4 API |
| **Frontend** | Streamlit |
| **Authentication** | OAuth 2.0 |
| **Cloud Integration** | Google Docs API |
| **Code Analysis** | AST (Abstract Syntax Tree) |

## 🔐 Security Features

- **Secure OAuth Flow**: Industry-standard authentication
- **API Key Management**: Environment-based credential storage
- **Sandboxed Execution**: Code analysis without arbitrary execution
- **Token Refresh**: Automatic OAuth token management
- **No Code Storage**: Files processed in-memory when possible

## 📊 Agent Capabilities

### Code Refactoring
- PEP 8 compliance
- Variable/function renaming
- Code structure optimization
- Dead code removal
- Complexity reduction

### Test Generation
- Unit test creation
- Edge case identification
- Mock object generation
- Coverage analysis
- Assertion validation

### Error Handling
- Exception handling patterns
- Input validation
- Defensive programming
- Logging integration
- Graceful degradation

### Documentation
- Docstring generation
- README creation
- API documentation
- Code comments
- Architecture diagrams

## 🎯 Project Highlights

- ✅ **Autonomous**: Plans and executes without constant user intervention
- ✅ **Context-Aware**: Understands code semantics, not just syntax
- ✅ **Multi-Step**: Orchestrates complex workflows across multiple tools
- ✅ **Production-Ready**: Includes error handling, logging, and authentication
- ✅ **User-Friendly**: Intuitive interface with real-time feedback

## 📈 Future Enhancements

- [ ] Support for additional programming languages (JavaScript, Java, Go)
- [ ] Integration with GitHub for PR-based workflows
- [ ] Custom tool creation interface
- [ ] Team collaboration features
- [ ] Code quality metrics dashboard
- [ ] CI/CD pipeline integration
- [ ] Self-improving agent through feedback loops

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
