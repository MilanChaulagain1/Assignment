provider "aws" {
  region = "us-east-1" 
}

# EC2 Instance Configuration
resource "aws_instance" "example" {
  ami           = "ami-06b21ccaeff8cd686" 
  instance_type = "t2.micro"
  subnet_id     = "subnet-080534d6972891265" 

  tags = {
    Name = "ExampleInstance"
  }
}
